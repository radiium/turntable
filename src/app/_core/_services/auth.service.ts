import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from 'ngx-electron';

import { User } from '../../_shared/models/user.model';
import { CONSTANT } from '../../_shared/constant';

@Injectable()
export class AuthService {

    // Config parameters
    scope        = CONSTANT.SCOPE;
    redirectUri  = 'http://localhost';
    clientId     = CONSTANT.CLIENT_ID;
    clientSecret = CONSTANT.CLIENT_SECRET;
    authUrl      = CONSTANT.AUTH_API;
    tokenUrl     = CONSTANT.TOKEN_API;

    // Electron auth window
    authWindow: any;

    // Electron auth window parameters
    windowParams = {
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
    };

    // User infos object observable
    private user = new Subject<User>();
    user$ = this.user.asObservable();

    constructor(
        private _http: Http,
        private Electron: ElectronService) {
    }



    // Authenticate user
    login() {
        this.getAccessToken();
    }

    // Logout user (revoke token)
    logout() {
        const logoutUrl =
            CONSTANT.LOGOUT_API +
            '?token=' + localStorage.getItem('access_token');
        return this._http.post(logoutUrl, '', this.getHeaders())
        .map((res) => res.json())
        .subscribe((result) => {
            console.log('Logout response');
            console.log(result);
            this.setUser(null);
        });
    }

    // Set user infos
    setUser(user) {
        this.user.next(user);
    }

    // Get access token
    getAccessToken() {
        return this.getAuthorizationCode()
        .then(authorizationCode => {
            const params = new URLSearchParams();
            params.append('code', authorizationCode.toString());
            params.append('grant_type', 'authorization_code');
            params.append('redirect_uri', this.redirectUri);

            return this.tokenRequest(params)
            .then((token: any) => {

                this.storeToken(token);

                // Get user infos
                this.getUserInfos()
                .subscribe((result) => {
                    this.setUser(new User(
                        result.name,
                        token.access_token,
                        token.refresh_token,
                        result.picture,
                        true
                    ));
                });

                // this._electronService.ipcRenderer.send('google-token', newToken);
            });
        });
    }

    // Get refresh token
    refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        const params = new URLSearchParams();
        params.append('refresh_token', refreshToken);
        params.append('grant_type', 'refresh_token');
        params.append('redirect_uri', this.redirectUri);

        return this.tokenRequest(params)
        .then((token: any) => {
            this.storeToken(token);
        });
    }

    // ------------------------------------------------------------------------
    // PRIVATE METHODS

    // Save token on localStorage
    private storeToken(token) {
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

    // Retrieve user infos
    private getUserInfos() {
        const userinfosUrl =
            CONSTANT.USER_API +
            '?access_token=' + localStorage.getItem('access_token');
        return this._http.get(userinfosUrl)
        .map((res: Response) => res.json());
    }

    // Get the authorization code from google OAuth api
    private getAuthorizationCode() {
        // Create reference of this component
        // for use it in promise
        const that = this;

        // Build auth url
        const authUrl =
            CONSTANT.AUTH_API +
            '?response_type=code' +
            '&redirect_uri=http://localhost' +
            '&client_id=' + that.clientId +
            '&state=' + that.generateRandomString(16) +
            '&scope=' + that.scope;

        // return promise
        return new Promise(function (resolve, reject) {
            // Create auth window and add handle on redirect callback
            that.authWindow = new that.Electron.remote.BrowserWindow(that.windowParams);
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
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        return this._http.post(CONSTANT.TOKEN_API , params, this.getHeaders())
        .map(res => res.json())
        .toPromise()
        .then(res => {

            return res;
        });
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
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/x-www-form-urlencoded');
        return {headers: headers};
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
