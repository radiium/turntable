import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';

import { UserInfosService } from './user-infos.service';
import { DataService } from '../data.service';
import { User } from '../../models';

@Injectable()
export class AuthService {

    // Config parameters
    clientId     = '164595742192-h6rci5hnhj8gfbbeaijsrrsu660d80r6.apps.googleusercontent.com';
    clientSecret = 'Q38usximxeb3rJXAUajjVRlY';
    authUrl      = 'https://accounts.google.com/o/oauth2/auth';
    tokenUrl     = 'https://accounts.google.com/o/oauth2/token';
    logoutUrl    = 'https://accounts.google.com/o/oauth2/revoke';
    tokenInfoUrl = 'https://www.googleapis.com/oauth2/v1/tokeninfo';
    redirectUri  = 'http://localhost';
    scope = [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    // Electron auth window and parameters
    authWindow: any;
    windowParams = {
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
    };

    constructor(
    private http: HttpClient,
    private dataService: DataService,
    private userInfosService: UserInfosService,
    private electron: ElectronService) {
    }

    // Authenticate user
    login() {
        this.getAccessToken();
    }

    // Logout user (revoke token)
    logout() {
        const logoutUrl = this.logoutUrl + '?token=' + localStorage.getItem('access_token');
        const options = { headers: this.getHeaders() };

        return this.http.post(logoutUrl, null , options)
        .subscribe((result) => {
            this.dataService.setUser(null);
            this.electron.ipcRenderer.send('remove-user');
        });
    }

    // Check auth to google api
    checkAuth() {
        const tokenInfoUrl =
            this.tokenInfoUrl +
            '?access_token=' + localStorage.getItem('access_token');

        return this.http.get(tokenInfoUrl);
    }

    // Get access token
    getAccessToken() {
        return this.getAuthorizationCode()
        .then(authorizationCode => {

            let params = new HttpParams();
            params = params.append('code', authorizationCode.toString());
            params = params.append('grant_type', 'authorization_code');
            params = params.append('redirect_uri', this.redirectUri);

            return this.tokenRequest(params)
            .then((token: any) => {

                this.storeToken(token);

                // Get user infos
                this.userInfosService.getUserInfos(token)
                .subscribe((result) => {
                    const user = new User(
                        result['name'], token,
                        result['picture'], true
                    );

                    // Set user
                    this.electron.ipcRenderer.send('save-user', user);
                    this.dataService.setUser(user);
                });

            });
        });
    }

    // Get refresh token
    refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        let params = new HttpParams();
        params = params.append('refresh_token', refreshToken);
        params = params.append('grant_type', 'refresh_token');
        params = params.append('redirect_uri', this.redirectUri);

        return this.tokenRequest(params)
        .then((token: any) => {
            this.storeToken(token);
        });
    }

    // Save token on localStorage
    storeToken(token) {
        if (token) {
            localStorage.setItem('id_token', token.id_token);
            localStorage.setItem('access_token', token.access_token);
            localStorage.setItem('token_type', token.token_type);
            localStorage.setItem('expires_in', token.expires_in);
            if (token.refresh_token) {
                localStorage.setItem('refresh_token', token.refresh_token);
            }
        }
    }

    // ------------------------------------------------------------------------
    // PRIVATE METHODS

    // Get the authorization code from google OAuth api
    private getAuthorizationCode() {
        const that = this;
        const authUrl =
            this.authUrl +
            '?response_type=code' +
            '&redirect_uri=' + this.redirectUri +
            '&client_id=' + that.clientId +
            '&state=' + that.generateRandomString(16) +
            '&scope=' + that.scope;

        return new Promise(function (resolve, reject) {
            // Create auth window and attach on redirect callback
            that.authWindow = new that.electron.remote.BrowserWindow(that.windowParams);
            that.authWindow.loadURL(authUrl);
            that.authWindow.show();
            that.authWindow.on('closed', () => {
                reject(new Error('window was closed by user'));
            });
            that.authWindow.webContents.on('will-navigate', (event, url) => {
                that.onCallback(url, resolve, reject, that.authWindow);
            });
            that.authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
                that.onCallback(newUrl, resolve, reject, that.authWindow);
            });
        });
    }

    // Resquest token
    private tokenRequest(params) {
        // Set request parameters
        params = params.append('client_id', this.clientId);
        params = params.append('client_secret', this.clientSecret);
        const options = { headers: this.getHeaders(), };

        return this.http.post(this.tokenUrl, params, options)
        .toPromise().then(res => res);
    }

    // Handle callback request
    private onCallback(url, resolve, reject, authWindow) {

        const params = this.parseQueryString(url);
        const error  = params.error;
        const code   = params.code;

        if (error !== undefined) {
            reject(error);
            this.authWindow.removeAllListeners('closed');
            setImmediate(function () { authWindow.close(); });
        } else if (code) {
            resolve(code);
            this.authWindow.removeAllListeners('closed');
            setImmediate(function () { authWindow.close(); });
        }
    }

    // Return custom headers
    private getHeaders() {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded'
        });
        return headers; // {headers: headers};
    }

    // Generate random string for state
    private generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    // Parse query url parameters
    private parseQueryString(queryString: string) {
        const params: any = {};
        const queries = queryString.split('&');
        queries.forEach((indexQuery: string) => {
            const indexPair = indexQuery.split('=');
            const queryKey = decodeURIComponent(indexPair[0]);
            const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : '');
            params[queryKey] = queryValue;
        });
        return params;
    }

    // Serialize objet to query string
    private serialize(obj, prefix) {
        const str = [];
        let p;

        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                const k = prefix ? prefix + '[' + p + ']' : p;
                const v = obj[p];
                str.push((v !== null && typeof v === 'object') ?
                this.serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return '?' + str.join('&');
    }
}
