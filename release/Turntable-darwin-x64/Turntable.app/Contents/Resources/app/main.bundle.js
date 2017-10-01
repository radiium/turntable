webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_core/core.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/_core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_youtube_service__ = __webpack_require__("../../../../../src/app/_core/services/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_player_service__ = __webpack_require__("../../../../../src/app/_core/services/player.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_suggest_service__ = __webpack_require__("../../../../../src/app/_core/services/suggest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_tabs_service__ = __webpack_require__("../../../../../src/app/_core/services/tabs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils_service__ = __webpack_require__("../../../../../src/app/_core/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_online_service__ = __webpack_require__("../../../../../src/app/_core/services/online.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_http_service__ = __webpack_require__("../../../../../src/app/_core/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [],
        declarations: [],
        exports: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__services_youtube_service__["a" /* YoutubeService */],
            __WEBPACK_IMPORTED_MODULE_3__services_player_service__["a" /* PlayerService */],
            __WEBPACK_IMPORTED_MODULE_4__services_playlist_service__["a" /* PlaylistService */],
            __WEBPACK_IMPORTED_MODULE_5__services_suggest_service__["a" /* SuggestService */],
            __WEBPACK_IMPORTED_MODULE_6__services_tabs_service__["a" /* TabsService */],
            __WEBPACK_IMPORTED_MODULE_7__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_8__services_online_service__["a" /* OnlineService */],
            __WEBPACK_IMPORTED_MODULE_9__services_http_service__["a" /* HttpService */]
        ]
    })
], CoreModule);

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_models_user_model__ = __webpack_require__("../../../../../src/app/_shared/models/user.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_constant__ = __webpack_require__("../../../../../src/app/_shared/constant.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthService = (function () {
    function AuthService(_http, Electron) {
        this._http = _http;
        this.Electron = Electron;
        // Config parameters
        this.scope = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].SCOPE;
        this.redirectUri = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].REDIRECT_URI;
        this.clientId = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].CLIENT_ID;
        this.clientSecret = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].CLIENT_SECRET;
        this.authUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].AUTH_API;
        this.tokenUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].TOKEN_API;
        this.logoutUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].LOGOUT_API;
        // Electron auth window parameters
        this.windowParams = {
            alwaysOnTop: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false
            }
        };
        // User infos object observable
        this.user = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.user$ = this.user.asObservable();
    }
    // Authenticate user
    AuthService.prototype.login = function () {
        console.log('login');
        this.getAccessToken();
    };
    // Logout user (revoke token)
    AuthService.prototype.logout = function () {
        var _this = this;
        console.log('logout');
        var logoutUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].LOGOUT_API +
            '?token=' + localStorage.getItem('access_token');
        return this._http.post(logoutUrl, '', this.getHeaders())
            .map(function (res) { return res.json(); })
            .subscribe(function (result) {
            console.log('Logout response');
            console.log(result);
            _this.setUser(null);
        });
    };
    // Set user infos
    AuthService.prototype.setUser = function (user) {
        this.user.next(user);
    };
    // Get access token
    AuthService.prototype.getAccessToken = function () {
        var _this = this;
        return this.getAuthorizationCode()
            .then(function (authorizationCode) {
            var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* URLSearchParams */]();
            params.append('code', authorizationCode.toString());
            params.append('grant_type', 'authorization_code');
            params.append('redirect_uri', _this.redirectUri);
            return _this.tokenRequest(params)
                .then(function (token) {
                _this.storeToken(token);
                // Get user infos
                _this.getUserInfos()
                    .subscribe(function (result) {
                    _this.setUser(new __WEBPACK_IMPORTED_MODULE_5__shared_models_user_model__["a" /* User */](result.name, token.access_token, token.refresh_token, result.picture, true));
                });
                // this._electronService.ipcRenderer.send('google-token', newToken);
            });
        });
    };
    // Get refresh token
    AuthService.prototype.refreshToken = function () {
        var _this = this;
        var refreshToken = localStorage.getItem('refresh_token');
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* URLSearchParams */]();
        params.append('refresh_token', refreshToken);
        params.append('grant_type', 'refresh_token');
        params.append('redirect_uri', this.redirectUri);
        return this.tokenRequest(params)
            .then(function (token) {
            _this.storeToken(token);
        });
    };
    // ------------------------------------------------------------------------
    // PRIVATE METHODS
    // Save token on localStorage
    AuthService.prototype.storeToken = function (token) {
        if (token) {
            localStorage.setItem('id_token', token.id_token);
            localStorage.setItem('access_token', token.access_token);
            localStorage.setItem('token_type', token.token_type);
            localStorage.setItem('expires_in', token.expires_in);
            if (token.refresh_token) {
                localStorage.setItem('refresh_token', token.refresh_token);
            }
        }
    };
    // Retrieve user infos
    AuthService.prototype.getUserInfos = function () {
        var userinfosUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].USER_API +
            '?access_token=' + localStorage.getItem('access_token');
        return this._http.get(userinfosUrl)
            .map(function (res) { return res.json(); });
    };
    // Get the authorization code from google OAuth api
    AuthService.prototype.getAuthorizationCode = function () {
        // Create reference of this component
        // for use it in promise
        var that = this;
        // Build auth url
        var authUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].AUTH_API +
            '?response_type=code' +
            '&redirect_uri=' + this.redirectUri +
            '&client_id=' + that.clientId +
            '&state=' + that.generateRandomString(16) +
            '&scope=' + that.scope;
        // return promise
        return new Promise(function (resolve, reject) {
            // Create auth window and add handle on redirect callback
            that.authWindow = new that.Electron.remote.BrowserWindow(that.windowParams);
            that.authWindow.loadURL(authUrl);
            that.authWindow.show();
            that.authWindow.on('closed', function () {
                reject(new Error('window was closed by user'));
            });
            that.authWindow.webContents.on('will-navigate', function (event, url) {
                that.onCallback(url, resolve, reject, that.authWindow);
            });
            that.authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
                that.onCallback(newUrl, resolve, reject, that.authWindow);
            });
        });
    };
    // Resquest token
    AuthService.prototype.tokenRequest = function (params) {
        // Set request parameters
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        return this._http.post(__WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].TOKEN_API, params, this.getHeaders())
            .map(function (res) { return res.json(); })
            .toPromise()
            .then(function (res) {
            return res;
        });
    };
    // Handle callback request
    AuthService.prototype.onCallback = function (url, resolve, reject, authWindow) {
        var params = this.parseQueryString(url);
        var error = params.error;
        var code = params.code;
        if (error !== undefined) {
            reject(error);
            this.authWindow.removeAllListeners('closed');
            setImmediate(function () { authWindow.close(); });
        }
        else if (code) {
            resolve(code);
            this.authWindow.removeAllListeners('closed');
            setImmediate(function () { authWindow.close(); });
        }
    };
    // Return custom headers
    AuthService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/x-www-form-urlencoded');
        return { headers: headers };
    };
    // Generate random string for state
    AuthService.prototype.generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    // Parse query url parameters
    AuthService.prototype.parseQueryString = function (queryString) {
        var params = {};
        var queries = queryString.split('&');
        queries.forEach(function (indexQuery) {
            var indexPair = indexQuery.split('=');
            var queryKey = decodeURIComponent(indexPair[0]);
            var queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : '');
            params[queryKey] = queryValue;
        });
        return params;
    };
    // Serialize objet to query string
    AuthService.prototype.serialize = function (obj, prefix) {
        var str = [];
        var p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p;
                var v = obj[p];
                str.push((v !== null && typeof v === 'object') ?
                    this.serialize(v, k) :
                    encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return '?' + str.join('&');
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_electron__["a" /* ElectronService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_electron__["a" /* ElectronService */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__("../../../../../src/app/_core/services/auth.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HttpService = (function (_super) {
    __extends(HttpService, _super);
    function HttpService(backend, options, auth) {
        var _this = _super.call(this, backend, options) || this;
        _this.authService = auth;
        return _this;
    }
    HttpService.prototype.request = function (url, options) {
        var _this = this;
        var token = localStorage.getItem('access_token');
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]() };
            }
            options.headers.append('Content-type', 'application/x-www-form-urlencoded');
            options.headers.append('Accept', 'application/json');
            options.headers.append('Authorization', "Bearer " + token);
        }
        else {
            url.headers.set('Authorization', "Bearer " + token);
        }
        return _super.prototype.request.call(this, url, options)
            .catch(function (res) {
            console.log('handle request error');
            // Handle invalid token status code and retry request
            if (res.status === 401 || res.status === 403) {
                _this.authService.refreshToken();
                return _super.prototype.request.call(_this, url, options);
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(res);
        });
    };
    return HttpService;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]));
HttpService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["i" /* XHRBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["i" /* XHRBackend */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* RequestOptions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["g" /* RequestOptions */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], HttpService);

var _a, _b, _c;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/online.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnlineService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OnlineService = (function () {
    function OnlineService() {
        this.isOnline$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(navigator.onLine), __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(window, 'online').mapTo(true), __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(window, 'offline').mapTo(false));
    }
    return OnlineService;
}());
OnlineService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], OnlineService);

//# sourceMappingURL=online.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/player.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_service__ = __webpack_require__("../../../../../src/app/_core/services/utils.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlayerService = (function () {
    // --------------------------------------------------------
    function PlayerService(utilsService, _playlistService) {
        var _this = this;
        this.utilsService = utilsService;
        this._playlistService = _playlistService;
        // --------------------------------------------------------
        // Suggest list
        this.suggestsResult = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.suggestsResult$ = this.suggestsResult.asObservable();
        // SearchBar results list
        this.resultsList = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.resultsList$ = this.resultsList.asObservable();
        // --------------------------------------------------------
        // PlayList list
        this.playListsList = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.playListsList$ = this.playListsList.asObservable();
        // Current PlayList
        this.currentPlayList = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.currentPlayList$ = this.currentPlayList.asObservable();
        // --------------------------------------------------------
        // HistoricList
        this.historicList = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.historicList$ = this.historicList.asObservable();
        // --------------------------------------------------------
        // Player video left
        this.playerLeft = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.playerLeft$ = this.playerLeft.asObservable();
        // Player video (right)
        this.playerRight = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.playerRight$ = this.playerRight.asObservable();
        // Active player (left)
        this.activePlayer = null; // = new Subject<Video>();
        this.isFirstPlay = true;
        this._playlistService.onPlayHistoricPlaylist$
            .subscribe(function (pl) {
            _this.onPlayHistoricPlaylist = pl;
        });
        this._playlistService.onPlayPlaylist$
            .subscribe(function (pl) {
            _this.onPlayPlaylist = pl;
        });
    }
    // --------------------------------------------------------
    // Setters
    PlayerService.prototype.setSuggestsResult = function (rl) { this.suggestsResult.next(rl); };
    PlayerService.prototype.setResultsList = function (vl) { this.resultsList.next(vl); };
    PlayerService.prototype.setPlayListsList = function (vl) { this.playListsList.next(vl); };
    PlayerService.prototype.setCurrentPlayList = function (vl) { this.currentPlayList.next(vl); };
    PlayerService.prototype.setHistoricList = function (hl) { this.historicList.next(hl); };
    PlayerService.prototype.setPlayerLeft = function (vl) {
        this.playerLeft.next(vl);
        this.updatePlaylists(vl);
    };
    PlayerService.prototype.setPlayerRight = function (vr) {
        this.playerRight.next(vr);
        this.updatePlaylists(vr);
    };
    PlayerService.prototype.setActivePlayer = function (side) { this.activePlayer = side; };
    PlayerService.prototype.getActivePlayer = function () { return this.activePlayer; };
    // Update on play playlist and on play historic
    PlayerService.prototype.updatePlaylists = function (video) {
        // Add video to on play historic playlist
        var hpl = this.utilsService.copyPlaylist(this.onPlayHistoricPlaylist);
        hpl.videolist.push(video);
        this._playlistService.setOnPlayHistoricPlayList(hpl);
        // Remove video from on play playlist
        var ppl = this.utilsService.copyPlaylist(this.onPlayPlaylist);
        var videolist = ppl.videolist;
        videolist = videolist.filter(function (el) {
            return el.id !== video.id;
        });
        ppl.videolist = videolist;
        this._playlistService.setOnPlayPlayList(ppl);
    };
    return PlayerService;
}());
PlayerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__utils_service__["a" /* UtilsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__utils_service__["a" /* UtilsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__playlist_service__["a" /* PlaylistService */]) === "function" && _b || Object])
], PlayerService);

var _a, _b;
//# sourceMappingURL=player.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/playlist.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__youtube_service__ = __webpack_require__("../../../../../src/app/_core/services/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_models_video_model__ = __webpack_require__("../../../../../src/app/_shared/models/video.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_models_playlist_model__ = __webpack_require__("../../../../../src/app/_shared/models/playlist.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PlaylistService = (function () {
    function PlaylistService(_youtubeService) {
        this._youtubeService = _youtubeService;
        // PlayList list
        this.playListsList = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.playListsList$ = this.playListsList.asObservable();
        // On play PlayList
        this.onEditPlaylist = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.onEditPlaylist$ = this.onEditPlaylist.asObservable();
        // On play PlayList
        this.onPlayPlaylist = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.onPlayPlaylist$ = this.onPlayPlaylist.asObservable();
        // On play historic PlayList
        this.onPlayHistoricPlaylist = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.onPlayHistoricPlaylist$ = this.onPlayHistoricPlaylist.asObservable();
        // Search result PlayList
        this.searchResultPlaylist = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.searchResultPlaylist$ = this.searchResultPlaylist.asObservable();
        // Load playlist progress bar value
        this.progressBarValue = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.progressBarValue$ = this.progressBarValue.asObservable();
    }
    // Setters
    PlaylistService.prototype.setPlayListsList = function (pl) { this.playListsList.next(pl); };
    PlaylistService.prototype.setOnEditPlayList = function (pl) { this.onEditPlaylist.next(pl); };
    PlaylistService.prototype.setOnPlayPlayList = function (pl) { this.onPlayPlaylist.next(pl); };
    PlaylistService.prototype.setOnPlayHistoricPlayList = function (pl) { this.onPlayHistoricPlaylist.next(pl); };
    PlaylistService.prototype.setSearchResultPlaylist = function (pl) { this.searchResultPlaylist.next(pl); };
    PlaylistService.prototype.setProgressBarValue = function (pbv) { this.progressBarValue.next(pbv); };
    // Fetch and load user playlist(s) and his video(s)
    // Into playlistslist Observable
    PlaylistService.prototype.fetchYoutubePlaylist = function () {
        var _this = this;
        // Get all playlist
        return this._youtubeService.getAllPlaylists()
            .flatMap(function (plList) {
            _this.setProgressBarValue(30);
            // Get all playlist items for each playlist
            var aRequest = [];
            plList.items.forEach(function (playlist, i) {
                var req = _this._youtubeService.getPlaylistItems(playlist.id, '')
                    .expand(function (data) { return _this._youtubeService.getPlaylistItems(playlist.id, data.nextPageToken); }, 1)
                    .pluck('items')
                    .scan(function (array, data) {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            array.push(data[key]);
                        }
                    }
                    return array;
                }, [])
                    .last()
                    .flatMap(function (plItemsList) {
                    // Parse videos id
                    var videoIdList = _this.parseVideoId(plItemsList);
                    var aReq = [];
                    // Get videos metadatas
                    videoIdList.forEach(function (videoIds) {
                        var reqVideo = _this._youtubeService.getVideosById(videoIds);
                        aReq.push(reqVideo);
                    });
                    var fork = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin(aReq)
                        .map(function (res) {
                        var videoList = [];
                        res.forEach(function (el, index) {
                            el.items.forEach(function (video) {
                                var objVideo = _this.parseVideo(video);
                                videoList.push(objVideo);
                            });
                        });
                        _this.setProgressBarValue(90);
                        // Create playlist object
                        return _this.parsePlaylist(playlist, videoList);
                    });
                    return fork;
                });
                aRequest.push(req);
            });
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin(aRequest);
        })
            .subscribe(function (playlistList) {
            _this.setProgressBarValue(99);
            // Set playlistlist
            _this.setPlayListsList(playlistList);
        });
    };
    // Get all video id from an array of playlist items
    PlaylistService.prototype.parseVideoId = function (playlistItemsList) {
        var videosIdList = [];
        for (var key in playlistItemsList) {
            if (playlistItemsList.hasOwnProperty(key)) {
                var videoId = playlistItemsList[key].snippet.resourceId.videoId;
                videosIdList.push(videoId);
            }
        }
        return this.concatVideoIdBy50(videosIdList);
    };
    // Set videos id list to array of string
    // Each string contains a maximum of 50 videos id
    PlaylistService.prototype.concatVideoIdBy50 = function (videosIdList) {
        var aVideoId = [];
        var cuttedVideoIdList = [];
        var nbrLoop = parseInt((videosIdList.length / 50).toString(), 10);
        if (nbrLoop > 1) {
            aVideoId.push(videosIdList.slice(0, 50).join(','));
            cuttedVideoIdList = videosIdList.slice(50);
            for (var i = 0; i < nbrLoop - 1; i++) {
                aVideoId.push(cuttedVideoIdList.slice(0, 50).join(','));
                cuttedVideoIdList = cuttedVideoIdList.slice(50);
            }
            aVideoId.push(cuttedVideoIdList.join(','));
        }
        else {
            aVideoId.push(videosIdList.join(','));
        }
        return aVideoId;
    };
    // Parse and convert playlist object from YouTube api to app playlist object
    /* Playlist resource model
    id: string,
    title: string,
    description: string,
    thumbUrl: string,
    thumbH: number,
    thumbW: number,
    publishedAt: string,
    privacyStatus: string,
    isLocal: boolean,
    videolist?: Video[]): Playlist
    */
    PlaylistService.prototype.parsePlaylist = function (playlist, videolist) {
        return new __WEBPACK_IMPORTED_MODULE_6__shared_models_playlist_model__["a" /* Playlist */](playlist.id, playlist.snippet.localized.title, playlist.snippet.localized.description, playlist.snippet.thumbnails.default.url, playlist.snippet.thumbnails.default.height, playlist.snippet.thumbnails.default.width, playlist.snippet.publishedAt, playlist.status.privacyStatus, false, videolist);
    };
    // Parse and convert video object from YouTube api to app video object
    /* Video resource model
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbUrl = thumbUrl;
    this.duration = duration;
    */
    PlaylistService.prototype.parseVideo = function (video) {
        return new __WEBPACK_IMPORTED_MODULE_5__shared_models_video_model__["a" /* Video */](video.id, video.snippet.localized.title, video.snippet.localized.description, video.snippet.thumbnails.default.url, __WEBPACK_IMPORTED_MODULE_3_moment__["duration"](video.contentDetails.duration).asMilliseconds());
    };
    return PlaylistService;
}());
PlaylistService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__youtube_service__["a" /* YoutubeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__youtube_service__["a" /* YoutubeService */]) === "function" && _a || Object])
], PlaylistService);

var _a;
//# sourceMappingURL=playlist.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/suggest.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuggestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constant__ = __webpack_require__("../../../../../src/app/_shared/constant.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SuggestService = (function () {
    function SuggestService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        // --------------------------------------------------------
        // Suggest list
        this.suggestsResult = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.suggestsResult$ = this.suggestsResult.asObservable();
        // SearchBar results list
        this.resultsList = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.resultsList$ = this.resultsList.asObservable();
    }
    // --------------------------------------------------------
    // Setters
    SuggestService.prototype.setSuggestsResult = function (rl) { this.suggestsResult.next(rl); };
    SuggestService.prototype.searchSuggestsVideo = function (query) {
        return this.jsonp.request(__WEBPACK_IMPORTED_MODULE_3__shared_constant__["a" /* CONSTANT */].SUGGEST_API + "?q=" + query + "&client=youtube&hl=fr&ds=yt&callback=JSONP_CALLBACK")
            .map(function (res) { return res.json(); });
    };
    return SuggestService;
}());
SuggestService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */]) === "function" && _b || Object])
], SuggestService);

var _a, _b;
//# sourceMappingURL=suggest.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/tabs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TabsService = (function () {
    function TabsService() {
        this.selectedTab = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.selectedTab$ = this.selectedTab.asObservable();
    }
    TabsService.prototype.setSelectedTab = function (st) { this.selectedTab.next(st); };
    return TabsService;
}());
TabsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], TabsService);

//# sourceMappingURL=tabs.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/utils.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models_playlist_model__ = __webpack_require__("../../../../../src/app/_shared/models/playlist.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilsService = (function () {
    function UtilsService() {
    }
    // Copy Playlist
    UtilsService.prototype.copyPlaylist = function (playlist, videolist) {
        var vl = new Array();
        if (videolist) {
            vl = videolist.slice();
        }
        else {
            vl = playlist.videolist.slice();
        }
        var pl = new __WEBPACK_IMPORTED_MODULE_1__shared_models_playlist_model__["a" /* Playlist */](playlist.id, playlist.title, playlist.description, playlist.thumbUrl, playlist.thumbH, playlist.thumbW, playlist.publishedAt, playlist.privacyStatus, playlist.isLocal, vl);
        return pl;
    };
    UtilsService.prototype.isVideolistEqual = function (videolist1, videolist2) {
        if (!videolist1 || !videolist2) {
            return false;
        }
        if (videolist1.length !== videolist2.length) {
            return false;
        }
        for (var i = 0; i < videolist1.length; i++) {
            if (videolist1[i].id !== videolist2[i].id) {
                return false;
            }
        }
        return true;
    };
    return UtilsService;
}());
UtilsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], UtilsService);

//# sourceMappingURL=utils.service.js.map

/***/ }),

/***/ "../../../../../src/app/_core/services/youtube.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__http_service__ = __webpack_require__("../../../../../src/app/_core/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_constant__ = __webpack_require__("../../../../../src/app/_shared/constant.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var YoutubeService = (function () {
    function YoutubeService(_http, _jsonp, httpService) {
        this._http = _http;
        this._jsonp = _jsonp;
        this.httpService = httpService;
    }
    // ------------------------------------------------------------------------
    // Get all playlist of user
    YoutubeService.prototype.getAllPlaylists = function () {
        var allPlaylistsUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].PLAYLIST_API +
            '?mine=true' +
            '&maxResults=50' +
            '&part=snippet,status';
        return this.httpService
            .request(allPlaylistsUrl, { method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestMethod */].Get, headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]() })
            .map(function (res) { return res.json(); });
    };
    // ------------------------------------------------------------------------
    // Get playlist items
    YoutubeService.prototype.getPlaylistItems = function (playlistId, pageToken) {
        if (typeof pageToken === 'undefined') {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].empty();
        }
        // Set url
        var playlistItemsUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].PLAYLIST_ITEMS_API +
            '?playlistId=' + playlistId +
            '&part=snippet,contentDetails' +
            '&maxResults=50';
        if (pageToken) {
            playlistItemsUrl += '&pageToken=' + pageToken;
        }
        return this.httpService
            .request(playlistItemsUrl, { method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestMethod */].Get, headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]() })
            .map(function (res) { return res.json(); });
    };
    // ------------------------------------------------------------------------
    //
    YoutubeService.prototype.createPlaylist = function () {
    };
    // ------------------------------------------------------------------------
    //
    YoutubeService.prototype.updatePlaylist = function () {
    };
    // ------------------------------------------------------------------------
    //
    YoutubeService.prototype.deletePlaylist = function () {
    };
    // ------------------------------------------------------------------------
    // Search video(s) by query string
    YoutubeService.prototype.searchVideos = function (query) {
        var _this = this;
        var searchVideosUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].SEARCH_API +
            '?q=' + query +
            '&key=' + __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].KEY_API +
            '&part=snippet' +
            '&maxResults=10';
        return this._http.get(searchVideosUrl)
            .map(function (res) { return res.json(); })
            .flatMap(function (searchData) {
            var idList = [];
            searchData.items.forEach(function (item) {
                idList.push(item.id.videoId);
            });
            return _this.getVideosById(idList.join(','));
        });
    };
    // ------------------------------------------------------------------------
    // Search video(s) by id
    YoutubeService.prototype.getVideosById = function (videosId) {
        var videosByIdUrl = __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].VIDEO_API +
            '?part=snippet,contentDetails' +
            '&id=' + videosId +
            '&key=' + __WEBPACK_IMPORTED_MODULE_6__shared_constant__["a" /* CONSTANT */].KEY_API;
        return this._http
            .request(videosByIdUrl, { method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestMethod */].Get, headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]() })
            .map(function (res) { return res.json(); });
    };
    return YoutubeService;
}());
YoutubeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__http_service__["a" /* HttpService */]) === "function" && _c || Object])
], YoutubeService);

var _a, _b, _c;
//# sourceMappingURL=youtube.service.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <h2 md-dialog-title>{{ title }}</h2>\n    <md-dialog-actions>\n    <button class=\"decline\" md-button [md-dialog-close]=\"false\">No</button>\n    <button class=\"accept\"  md-button [md-dialog-close]=\"true\">Yes</button>\n    </md-dialog-actions>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = data.title;
    }
    ConfirmDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return ConfirmDialogComponent;
}());
ConfirmDialogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-confirm-dialog',
        template: __webpack_require__("../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdDialogRef */]) === "function" && _a || Object, Object])
], ConfirmDialogComponent);

var _a;
//# sourceMappingURL=confirm-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/components/range-slider-2/range-slider-2.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".sliderContainer {\n\t-webkit-transform: rotate(270deg);\n\t        transform: rotate(270deg);\n}\n\n.sliderBox {\n\theight: 34px;\n\twidth: 200px;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: horizontal;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: row;\n\t        flex-direction: row;\n\t-ms-flex-wrap: nowrap;\n\t    flex-wrap: nowrap;\n\t-webkit-box-pack: justify;\n\t    -ms-flex-pack: justify;\n\t        justify-content: space-between;\n\toverflow: hidden;\n}\n\n/* VOLUME BUTTONS */\n#slider-left,\n#slider-right,\n#slider-left,\n#slider-right {\n\theight: auto;\n\twidth: 34px;\n}\n\n#slider-left label,\n#slider-right label,\n#slider-left label,\n#slider-right label {\n\tmargin-top: 5px;\n\tcolor: #25E1DA;\n\tfont-size: 0.8rem;\n}\n\ninput[type=\"range\"] { \n    margin: auto;\n    -webkit-appearance: none;\n    overflow: hidden;\n    cursor: pointer;\n    border-radius: 0; /* iOS */\n\theight: 34px;\n\t/*width: 107.5px;*/\n\t/*\n    position: relative;\n\t-webkit-transform: rotate(270deg);\n\ttransform: rotate(270deg);\n\tmargin-left: -37px;\n\tmargin-top: 36.5px;\n\tmargin-bottom: 36.5px;\n\tdisplay: none;\n\t*/\n\tz-index: 0;\n\tmargin-top: -1px;\n\tmargin-left: -2px;\n\twidth: 107px;\n}\n\n::-webkit-slider-runnable-track {\n    background: #242320;;\n}\n\n/*\n * 1. Set to 0 height and width, and remove border for a slider without a thumb\n */\n::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    width: 12px; /* 1 */\n    height: 34px; /* 1 */\n    background: #fff;\n    box-shadow: -100vw 0 0 100vw #504F4C;\n}\n\n::-moz-range-track {\n    height: 34px;\n    background: #ddd;\n}\n\n::-moz-range-thumb {\n    background: #fff;\n    height: 34px;\n    width: 12px;\n    border-radius: 0 !important;\n    box-shadow: -100vw 0 0 100vw #504F4C;\n    box-sizing: border-box;\n\tborder: none;\n}\n\n::-ms-fill-lower { \n    background: #504F4C;\n}\n\n::-ms-thumb { \n    background: #fff;\n    height: 34px;\n    width: 12px;\n    box-sizing: border-box;\n}\n\n::-ms-ticks-after { \n    display: none; \n}\n\n::-ms-ticks-before { \n    display: none; \n}\n\n::-ms-track { \n    background: #ddd;\n    color: transparent;\n    height: 34px;\n    border: none;\n}\n\n::-ms-tooltip { \n    display: none;\n}\n\n\n\n\n\n.slider-input-left,\n.slider-input-right,\n.slider-input-left,\n.slider-input-right {\n\t/*\n\tposition: absolute;\n\t*/\n}\n\n\n/* CROSSFADER */\n\n#crossfader-box {\n\tmargin-top: 40px;\n\tmargin-bottom: 20px;\n\tpadding: 10px;\n}\n\n#tickmarks-center option {\n    font-weight: normal;\n    display: block;\n    white-space: pre;\n    min-height: 1,2em;\n    padding: 0px 2px 1px;\n    padding-top: 0px;\n    padding-right: 2px;\n    padding-bottom: 1px;\n    padding-left: 2px;\n}\n\n#crossfader-box input[type='range'] {\n    -webkit-appearance: none !important;\n    /*background-color:#817E7E;*/\n\tborder: 1px solid #C9C8C3 ;\n\tbox-shadow: inset 0px 0px 23px 0px rgba(0,0,0,0.67);\t\n    height: 15px;\n\t/*width: 150px;*/\n\tborder-radius: 5px;\n\tmargin-top: 10px;\n\tmargin-bottom: 20px;\n}\n\n#crossfader-box input[type='range']::-webkit-slider-thumb {\n\t-webkit-appearance: none !important;\n\tbackground-color:#6C6866 ;\n\tborder-top: \t8px solid #C9C8C3 ;\n\tborder-left: \t3px solid #504F4C ;\n\tborder-right: \t3px solid #504F4C ;\n\tborder-bottom: \t8px solid #817E7E ;\n\theight: 55px;\n\twidth: 20px;\n\tborder-radius: 2px;\n\tbox-shadow: 0px 4px 10px 0px rgba(0,0,0,0.67);\n}\n\n\n/* BUTTONS */\n\n.grpBtn {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    width: 175px;\n\toverflow: hidden;\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1;\n\t        flex: 1;\n\n}\n\n.btn {\n\tz-index: 2;\n\twidth: 34px;\n\tmargin: 0 auto;\n\tpadding: 0;\n}\n\n.btn button {\n\t/*background-color: #ECECEC;*/\n\tcolor: black;\n\tbackground-color: #817E7E;\n\tcursor: pointer;\n\tborder: none;\n\toutline: none;\n\twidth: 34px;\n\theight: 34px;\n\tmargin-left: -1px;\n\t/*\n\ttext-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);\n\t*/\n}\n\n.fa-2x {\n    line-height: 34px !important;\n}\n\n.btn button:active {\n\tcolor: #25E1DA;\n\ttext-shadow: 0px 0px 15px #25E1DA;\n}\n\n.btn button:hover {\n\tcolor: #0f5e5b;\n    /*background-color: #e5e5e5;*/\n\t/*background-color: #636363;*/\n}\n.btn button:hover:active  {\n\tcolor: #25E1DA;\n}\n\n/* OUTPUT */\n.outputBox {\n\theight: 20px;\n\twidth: 34px;\n\tmargin-bottom: 5px;\n\tpadding: 0;\n\tbackground-color: transparent;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n\tmargin-top: 7px;\n\tmargin-right: -6px;\n\tmargin-left: -3px;\n}\n.output {\n\twidth: 34px;\n\theight: 20px;\n\tfont-size: 0.8rem;\n\ttext-align: center;\n\tcolor: #25E1DA;\n\tbackground-color: #817E7E;\n\ttext-shadow: 0px 0px 15px #25E1DA;\n\tmargin-top: -1px;\n box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);\n}\n.output span {\n\tfont-size: 0.6rem;\n}\n\n\n/*\n-webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);\n    -moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);\n    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);\n\t*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/components/range-slider-2/range-slider-2.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"slider-{{ side }}\" class=\"sliderContainer\">\n    <div class=\"sliderBox\">\n\n        <!--\n        <label for=\"\">{{ name }}</label>\n        -->\n\n        <div class=\"grpBtn\">\n            <div class=\"btn\">\n            <button (click)=\"down()\"><fa [name]=\"'minus'\" [rotate]=\"90\" [border]=false [size]=\"2\"></fa></button>\n            </div>\n\n            <div class=\"slider slider-input-{{ side }}\">\n            <input class=\"slider-range\" type=\"range\" [(ngModel)]=\"value\" (input)=\"onInputChange($event)\" value=\"{{ value }}\" min=\"{{ min }}\" max=\"{{ max }}\" step=\"{{ step }}\"/>\n            </div>\n\n            <div class=\"btn\">\n            <button (click)=\"up()\"><fa [name]=\"'plus'\" [rotate]=\"90\" [border]=false [size]=\"2\"></fa></button>\n            </div>\n        </div>\n\n        <div class=\"outputBox\">\n            <div class=\"output\">\n            <span *ngIf=\"name === 'Speed'\">x</span> {{ value }}\n            </div>\n        </div>\n\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/_shared/components/range-slider-2/range-slider-2.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RangeSlider2Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RangeSlider2Component = (function () {
    function RangeSlider2Component() {
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    RangeSlider2Component.prototype.ngOnInit = function () {
        this.value = this.default;
    };
    RangeSlider2Component.prototype.onInputChange = function (e) {
        if (!this.isPlayerReady) {
            this.value = this.default;
            e.target.value = this.default;
            return;
        }
        this.value = e.target.value;
        this.valueChange.emit(this.value);
    };
    RangeSlider2Component.prototype.up = function () {
        if (!this.isPlayerReady) {
            return;
        }
        this.value = this.value + this.step;
        if (this.value >= this.max) {
            this.value = this.max;
        }
        else if (this.value <= this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    };
    RangeSlider2Component.prototype.down = function () {
        if (!this.isPlayerReady) {
            return;
        }
        this.value = this.value - this.step;
        if (this.value >= this.max) {
            this.value = this.max;
        }
        else if (this.value <= this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    };
    return RangeSlider2Component;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], RangeSlider2Component.prototype, "isPlayerReady", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], RangeSlider2Component.prototype, "name", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], RangeSlider2Component.prototype, "side", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], RangeSlider2Component.prototype, "step", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], RangeSlider2Component.prototype, "min", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], RangeSlider2Component.prototype, "max", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], RangeSlider2Component.prototype, "default", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], RangeSlider2Component.prototype, "value", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], RangeSlider2Component.prototype, "valueChange", void 0);
RangeSlider2Component = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-range-slider-2',
        template: __webpack_require__("../../../../../src/app/_shared/components/range-slider-2/range-slider-2.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_shared/components/range-slider-2/range-slider-2.component.css")]
    }),
    __metadata("design:paramtypes", [])
], RangeSlider2Component);

var _a;
//# sourceMappingURL=range-slider-2.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/components/video-player/video-player.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.playerContainer {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    margin-bottom: 5px;\n}\n\n.playerLeft  { -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; }\n.playerRight { -webkit-box-orient: horizontal; -webkit-box-direction: reverse; -ms-flex-direction: row-reverse; flex-direction: row-reverse; }\n\n/* Player */\n\n.playerBox {\n    width: 300px;\n    height: 239px;;\n    display: -webkit-box;;\n    display: -ms-flexbox;;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n\n.player {\n    width: 300px;\n    height: 200px;\n    margin-bottom: 5px;\n    position: relative;\n}\n\n.player .playerLoader {\n    width: 300px;\n    height: 200px;\n    margin-bottom: 5px;\n    position: absolute;\n    color: white;\n    background-color: black;\n}\n\n.activVideo {\n    width: 300px;\n    height: 34px;\n    color: lightgray;\n    cursor: default;\n    background-color: #242320;\n}\n\n.activVideo > div {\n    height: 34px;\n    line-height: 24px;\n}\n\n.activVideo .noVideo {\n    line-height: 34px;\n    text-align: center;\n    opacity: 0.3;\n}\n\n.currVideo {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n\n.playerLeft .currVideo  {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.playerRight .currVideo {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n\n.currTitle {\n    padding: 5px;\n    height: 24px;\n    max-width: 250px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.currTime {\n    /*width: 46px;*/\n}\n\n/* Control */\n.control {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n\n.control button {\n    margin-top: 5px;\n    border: none;\n    outline: none;\n    width: 34px;\n    height: 34px;\n    background-color: #817E7E;\n}\n.btn button:active {\n\tcolor: #25E1DA;\n\ttext-shadow: 0px 0px 15px #25E1DA;\n}\n\n.control button:hover {\n    color: #0f5e5b;\n}\n.control button:hover:active  {\n\tcolor: #25E1DA;\n}\n\n\n.playerLeft .volume {\n    margin-left: 5px;\n}\n\n.playerRight .volume {\n    margin-right: 5px;\n}\n\n.playerLeft .speed {\n    margin-left: 5px;\n}\n\n.playerRight .speed {\n    margin-right: 5px;\n}\n\n.output {\n    line-height: 24px;\n\tmargin-top: 3px;\n    margin-bottom: 3px;\n    margin-left: 5px;\n    margin-right: 5px;\n    padding-left: 3px;\n    padding-right: 3px;\n\tborder: 2px solid #101010;\n\tborder-radius: 5px;\n\tcolor: #25E1DA;\n\tbackground-color: #504F4C;\n\ttext-shadow: 0px 0px 15px #25E1DA;\n}\n\napp-range-slider-2 {\n\tmargin-top: 166px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/components/video-player/video-player.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"playerContainer\" [class.playerLeft]=\"sidePlayer === 'left'\" [class.playerRight]=\"sidePlayer === 'right'\">\n   \n    <div class=\"playerBox\">\n        <div class=\"player\">\n            <div class=\"playerLoader\" *ngIf=\"!video\"></div>\n            <app-youtube-player [width]=\"300\" [height]=\"200\" [videoId]=\"id\" (ready)=\"savePlayer($event)\" (change)=\"onStateChange($event)\"></app-youtube-player>\n        </div>\n        <div class=\"activVideo\">\n            <div *ngIf=\"!video\" class=\"noVideo\">No Video Loaded</div>\n            <div *ngIf=\"video\"  class=\"currVideo\">\n                <div class=\"currTitle\">{{ video.title }}</div>\n                <div class=\"currTime output\">{{ currDuration }}</div>\n            </div>\n        </div>\n   </div>\n \n        \n       \n    <div class=\"volume control\">\n        <app-range-slider-2 [name]=\"'Speed'\" [side]=\"sidePlayer\" [default]=\"1\"\n                          [value]=\"speed\" (valueChange)=\"onSpeedChange($event)\"\n                          [step]=\"0.25\" [min]=\"0.5\" [max]=\"2\" [isPlayerReady]=\"player && video\"></app-range-slider-2>\n                          \n        <button type=\"button\" (click)=\"playPauseVideo()\">\n            <fa *ngIf=\"!isPlaying\" [name]=\"'play'\"  [size]=\"2\"></fa>\n            <fa *ngIf=\"isPlaying\"  [name]=\"'pause'\" [size]=\"2\"></fa>\n        </button>\n    </div>\n\n    <div class=\"speed control\">\n        <app-range-slider-2 [name]=\"'Vol'\" [side]=\"'left'\" [default]=\"100\"\n                          [value]=\"volume\" (valueChange)=\"onVolumeChange($event)\"\n                          [step]=\"1\" [min]=\"0\" [max]=\"100\" [isPlayerReady]=\"player && video\"></app-range-slider-2>\n\n        <button type=\"button\" (click)=\"mute()\">\n            <fa *ngIf=\"!isMuted\" [name]=\"'volume-up'\"  [size]=\"2\"></fa>\n            <fa *ngIf=\"isMuted\"  [name]=\"'volume-off'\" [size]=\"2\"></fa>\n        </button>\n    </div>\n    \n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/_shared/components/video-player/video-player.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_video_model__ = __webpack_require__("../../../../../src/app/_shared/models/video.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_player_service__ = __webpack_require__("../../../../../src/app/_core/services/player.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VideoPlayerComponent = (function () {
    function VideoPlayerComponent(_playerService, _playlistService) {
        var _this = this;
        this._playerService = _playerService;
        this._playlistService = _playlistService;
        this._playlistService.onPlayPlaylist$.subscribe(function (pl) {
            _this.playList = pl;
        });
        this.isPlaying = false;
        this.isMuted = false;
        this.isPlayerLoaded = false;
        this.speedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.volumeChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.nearEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.timerControl$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.currDuration = '00:00';
    }
    VideoPlayerComponent.prototype.onVolumeChange = function (vol) {
        if (!this.player || !this.video) {
            return;
        }
        if (vol < 1) {
            this.isMuted = true;
        }
        else if (vol > 1 && vol < 100) {
            this.isMuted = false;
        }
        this.player.setVolume(vol);
    };
    VideoPlayerComponent.prototype.onSpeedChange = function (speed) {
        if (!this.player || !this.video) {
            return;
        }
        this.player.setPlaybackRate(speed);
    };
    VideoPlayerComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    // Trigger when input change
    VideoPlayerComponent.prototype.ngOnChanges = function (changes) {
        // Only if not the first change
        if (this.player && changes.video && !changes.video.firstChange) {
            // Load video
            this.player.cueVideoById(this.video.id);
            // Play video if:
            // - previous video is on playing
            // - is the first played video
            // - no active player found
            // - previousValue is undefined (first video on this player)
            if (this.ytEvent === 1
                || this._playerService.isFirstPlay
                || this._playerService.getActivePlayer() === null
                || changes.video.previousValue === undefined) {
                this.initControl();
                this.playPauseVideo();
                this._playerService.setActivePlayer(this.sidePlayer);
            }
            // Set first played video to false
            this._playerService.isFirstPlay = false;
        }
    };
    // -1 : non démarré
    // 0 : arrêté
    // 1 : en lecture
    // 2 : en pause
    // 3 : en mémoire tampon
    // 5 : en file d'attente
    VideoPlayerComponent.prototype.onStateChange = function (event) {
        this.ytEvent = event.data;
        this.stopTimer();
        if (this.ytEvent === 1) {
            this.timerControl$.next(this.getRemainingTime());
            this.isPlaying = true;
        }
        else if (this.ytEvent === 0) {
            this.isPlaying = false;
            if (this.playList.videolist && this.playList.videolist.length > 0) {
                var videoToPlay = this.playList.videolist[0];
                if (this.sidePlayer === 'left') {
                    this._playerService.setPlayerLeft(videoToPlay);
                }
                else {
                    this._playerService.setPlayerRight(videoToPlay);
                }
                // this.playList.videolist.shift();
                // this._playlistService.setOnPlayPlayList(this.playList);
            }
        }
        else {
            this.isPlaying = false;
        }
    };
    VideoPlayerComponent.prototype.savePlayer = function (player) {
        this.player = player;
    };
    // Play/Pause
    VideoPlayerComponent.prototype.playPauseVideo = function () {
        if (!this.player || !this.video) {
            return;
        }
        if (this.player.getPlayerState() === 1) {
            this.player.pauseVideo();
            this.isPlaying = false;
            this._playerService.setActivePlayer(null);
            this.stopTimer();
        }
        else {
            this.player.playVideo();
            this.isPlaying = true;
            this._playerService.setActivePlayer(this.sidePlayer);
            this.stopTimer();
            this.timerControl$.next(this.getRemainingTime());
        }
    };
    // Mute/Unmute
    VideoPlayerComponent.prototype.mute = function () {
        if (!this.player || !this.video) {
            return;
        }
        if (this.player.isMuted()) {
            this.player.unMute();
            this.isMuted = false;
        }
        else {
            this.player.mute();
            this.isMuted = true;
        }
    };
    // Set video control to default values
    VideoPlayerComponent.prototype.initControl = function () {
        this.player.setPlaybackRate(1);
        // this.player.unMute();
        this.isPlaying = false;
        this.isMuted = false;
    };
    // Init Timer
    VideoPlayerComponent.prototype.initTimer = function () {
        var _this = this;
        // console.log('Init Timer');
        this.timerControl$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.timer$ = this.timerControl$.switchMap(function (period) { return period ? __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(period, 1000) : __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].empty(); });
        this.sub = this.timer$.subscribe(function (t) {
            _this.currDuration = __WEBPACK_IMPORTED_MODULE_2_moment__["utc"](Math.round(_this.player.getCurrentTime() * 1000)).format('mm:ss').toString();
            /*
            console.log(this.player.getCurrentTime());
            console.log(this.player.getCurrentTime() * 1000);
            console.log(Math.round(this.player.getCurrentTime()));
            console.log(this.currDuration);
            */
            if (_this.getRemainingTime() < 12) {
                console.log('***** ' + _this.sidePlayer + ' Video near end ******');
                _this.stopTimer();
                _this.nearEnd.emit(_this.player.getVolume());
            }
        });
    };
    VideoPlayerComponent.prototype.getPlayerState = function () {
        return this.player.getPlayerState();
    };
    // Stop timer
    VideoPlayerComponent.prototype.stopTimer = function () {
        // console.log('Stop Timer');
        this.timerControl$.next();
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.initTimer();
    };
    VideoPlayerComponent.prototype.getRemainingTime = function () {
        return Math.round(this.player.getDuration() - this.player.getCurrentTime());
    };
    return VideoPlayerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], VideoPlayerComponent.prototype, "volumeChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], VideoPlayerComponent.prototype, "volume", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], VideoPlayerComponent.prototype, "speedChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], VideoPlayerComponent.prototype, "speed", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], VideoPlayerComponent.prototype, "sidePlayer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__models_video_model__["a" /* Video */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_video_model__["a" /* Video */]) === "function" && _c || Object)
], VideoPlayerComponent.prototype, "video", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _d || Object)
], VideoPlayerComponent.prototype, "nearEnd", void 0);
VideoPlayerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-video-player',
        template: __webpack_require__("../../../../../src/app/_shared/components/video-player/video-player.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_shared/components/video-player/video-player.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__core_services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_services_player_service__["a" /* PlayerService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__core_services_playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_services_playlist_service__["a" /* PlaylistService */]) === "function" && _f || Object])
], VideoPlayerComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=video-player.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONSTANT; });
// @Injectable()
var CONSTANT = (function () {
    function CONSTANT() {
    }
    return CONSTANT;
}());

CONSTANT.USER_API = 'https://www.googleapis.com/oauth2/v1/userinfo';
CONSTANT.SUGGEST_API = 'http://suggestqueries.google.com/complete/search';
CONSTANT.SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';
CONSTANT.VIDEO_API = 'https://www.googleapis.com/youtube/v3/videos';
CONSTANT.PLAYLIST_API = 'https://www.googleapis.com/youtube/v3/playlists';
CONSTANT.PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
CONSTANT.AUTH_API = 'https://accounts.google.com/o/oauth2/auth';
CONSTANT.TOKEN_API = 'https://accounts.google.com/o/oauth2/token';
CONSTANT.LOGOUT_API = 'https://accounts.google.com/o/oauth2/revoke';
CONSTANT.REDIRECT_URI = 'http://localhost';
CONSTANT.KEY_API = 'AIzaSyCUgeZ1Wous0x3Rjw3EZQQPKDQTXJB21Es';
CONSTANT.CLIENT_ID = '164595742192-h6rci5hnhj8gfbbeaijsrrsu660d80r6.apps.googleusercontent.com';
CONSTANT.CLIENT_SECRET = 'Q38usximxeb3rJXAUajjVRlY';
CONSTANT.SCOPE = 'https://www.googleapis.com/auth/youtube ' +
    'https://www.googleapis.com/auth/youtube.force-ssl ' +
    'https://www.googleapis.com/auth/userinfo.profile';
//# sourceMappingURL=constant.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/directives/click-outside.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickOutsideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ClickOutsideDirective.prototype.onClick = function (event, targetElement) {
        if (!targetElement || targetElement.id === 'menuBtn') {
            return;
        }
        var clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    };
    return ClickOutsideDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ClickOutsideDirective.prototype, "clickOutside", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:click', ['$event', '$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClickOutsideDirective.prototype, "onClick", null);
ClickOutsideDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[appClickOutside]',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], ClickOutsideDirective);

var _a;
//# sourceMappingURL=click-outside.directive.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/models/playlist.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Playlist; });
/*
export class Playlist {
    constructor(
        public id: string,
        public name: string,
        public videolist: Array<Video>) {
            this.id = id;
            this.name = name;
            this.videolist = videolist;
    }
}
*/
var Playlist = (function () {
    function Playlist(id, title, description, thumbUrl, thumbH, thumbW, publishedAt, privacyStatus, isLocal, videolist) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbUrl = thumbUrl;
        this.thumbH = thumbH;
        this.thumbW = thumbW;
        this.publishedAt = publishedAt;
        this.privacyStatus = privacyStatus;
        this.isLocal = isLocal;
        this.videolist = videolist;
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbUrl = thumbUrl;
        this.thumbH = thumbH;
        this.thumbW = thumbW;
        this.publishedAt = publishedAt;
        this.privacyStatus = privacyStatus;
        this.isLocal = isLocal;
        this.videolist = videolist;
    }
    return Playlist;
}());

//# sourceMappingURL=playlist.model.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/models/suggests.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Suggests; });
var Suggests = (function () {
    function Suggests(query, suggests) {
        this.query = query;
        this.suggests = suggests;
        this.query = query;
        this.suggests = suggests;
    }
    return Suggests;
}());

//# sourceMappingURL=suggests.model.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/models/user.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(name, access_token, refresh_token, img, isAuthenticated) {
        this.name = name;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.img = img;
        this.isAuthenticated = isAuthenticated;
        this.name = name;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.img = img;
        this.isAuthenticated = isAuthenticated;
    }
    return User;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/models/video.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Video; });
var Video = (function () {
    function Video(id, title, description, thumbUrl, duration) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbUrl = thumbUrl;
        this.duration = duration;
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbUrl = thumbUrl;
        this.duration = duration;
    }
    return Video;
}());

//# sourceMappingURL=video.model.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* General */\n.editPlaylistContainer {\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    overflow: hidden;\n}\n\n/* Playlist box */\n.editPlaylistBox { width: calc(50%); }\n.editPlaylistBoxLeft { margin-right: 2.5px; }\n.editPlaylistBoxRight { margin-left: 2.5px; }\n\n/* Header */\n.editPlaylistHeader {\n    height: 34px;\n    min-height: 34px;\n    margin-bottom: 5px;\n}\n\n/* Content playlist */\n.editPlaylistContent {\n    height: calc(100% - 39px);\n    background-color: gray;\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n/* Playlist items */\n.playlist { height: 100%; }\n\n.videoItem {\n    width: 100%;\n    background-color: #242320;\n    list-style: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.videoItem:not(:last-child) { margin-bottom: 2px; }\n\n/* Playlist items controls */\n.videoControl {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n\n.videoInfos {\n    width: 100%;\n    margin: 2px;\n}\n\n.deleteBtn {\n    text-align: center;\n    margin-left: 20px;\n    margin-right: 20px;\n    top: 25px;\n    float: right;\n}\n\n.mix-btn {\n    text-align: center;\n    margin-right: 10px;\n    top: 25px;\n    float: right;\n}\n\n.leftBtn { padding-right: 6px; margin-left: 10px; }\n.rightBtn { padding-left: 6px; }\n\n/* Drop infos */\n.dropInfos {\n    border-radius: 15px;\n    font-size: 1.8rem;\n    font-weight: bold;\n    text-align: center;\n    opacity: 0.4;\n    color: black;\n    border: 5px dashed black;\n    padding: 20px;\n    height: calc(100% - 50px);\n}\n\n#playlistLoginBtn {\n    font-size: 1.2rem;\n    line-height: 39px;\n    background-color: darkgray\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Header */\n#headerContainer {\n    width: 100%;\n    height: 100%;\n    color: white;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack:justify;\n        -ms-flex-pack:justify;\n            justify-content:space-between;\n}\n\n#headerBox {\n    width: 100%;\n    font-size: 1rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end\n}\n\n.headerItem {\n    line-height: 24px;\n    padding: 5px 5px 5px 10px;\n    background-color: #242320;\n    margin-right: 5px;\n    white-space: nowrap;\n}\n.changePlaylistBtn {\n    min-width: 112px;\n    text-align: center;\n}\n.headerItem:last-child { margin-right: 0; }\n#headerPlaylistTitle { -webkit-box-flex: 1; -ms-flex: 1 1 auto; flex: 1 1 auto; }\n\n.headerItem input[type='button'] {\n    color: darkgray;\n    padding: 5px;\n    margin: 0;\n    border: none;\n    outline: none;\n    height: 100%;\n    font-size: 1rem;\n    background-color: #101010;\n    cursor: pointer;\n}\n\n.infoBarBtn { padding: 0; }\n.infoBarBtn input{ padding: 5px; }\n.infoBarItem input.active { color: #25E1DA; }\n.infoBarItem input:hover { color: #b2b2b2; }\n.infoBarItem input.active:hover { color: #28fff7; }\n\n\n/* Output box */\n.output {\n\tmargin-top: 10px;\n\tmargin-bottom: 10px;\n\tmargin-left: 5px;\n\tmargin-right: 5px;\n    padding-left: 3px;\n    padding-right: 3px;\n\tborder: 2px solid #101010;\n\tborder-radius: 5px;\n\tcolor: #25E1DA;\n\tbackground-color: #504F4C;\n\ttext-shadow: 0px 0px 15px #25E1DA;\n}\n\n.noPlaylist {\n    width: 100%;\n    height: 34px;\n    background-color: #242320;\n    color: white;\n}\n\n.noPlaylistText {\n    width: 100%;\n    line-height: 34px;\n    text-align: center;\n    opacity: 0.3;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Edit playlist container -->\n<div class=\"editPlaylistContainer\">\n\n    <!-- Left playlist (editable playlist) -->\n    <div class=\"editPlaylistBoxLeft editPlaylistBox\">\n\n\n        <!-- Header infos playlist-->\n        <div class=\"editPlaylistHeader\">\n            <div id=\"headerContainer\">\n                <div *ngIf=\"playlist && activePlaylist === 'Playlist'\" id=\"headerBox\">\n                \n                    <!-- Playlist titl-->\n                    <div id=\"headerPlaylistTitle\" class=\"headerItem\"><span>{{ playlist.title }}</span></div>\n\n                    <!-- Change playlist / historic - Only on player-->\n                    <div *ngIf=\"type === 'player'\" class=\"headerItem infoBarBtn changePlaylistBtn\">\n                        <input type=\"button\" value=\"Show playlist\" (click)=\"changePlaylist()\">\n                    </div>\n                    \n                    <!-- Nbr of video(s) -->\n                    <div class=\"headerItem\">\n                        <span> Video<span *ngIf=\"playlist.videolist.length > 1\">s</span></span>\n                        <span>: </span>\n                        <span class=\"output\">{{ playlist.videolist.length }}</span>\n                    </div>\n\n                    <!-- Total time playlist-->\n                    <div class=\"headerItem\">\n                        <span>Total time: </span>\n                        <span class=\"output\">{{ totalDuration | duration:true }}</span>\n                    </div>\n                </div>\n\n\n                <div *ngIf=\"activePlaylist === 'Historic'\" id=\"headerBox\">\n                \n                    <!-- Playlist titl-->\n                    <div id=\"headerPlaylistTitle\" class=\"headerItem\"><span>Historic</span></div>\n\n                    <!-- Change playlist / historic - Only on player-->\n                    <div *ngIf=\"type === 'player'\" class=\"headerItem infoBarBtn changePlaylistBtn\">\n                        <input type=\"button\" value=\"Show historic\" (click)=\"changePlaylist()\">\n                    </div>\n                    \n                    <!-- Nbr of video(s) -->\n                    <div class=\"headerItem\">\n                        <span> Video<span *ngIf=\"playlist.videolist.length > 1\">s</span></span>\n                        <span>: </span>\n                        <span *ngIf=\"historic\" class=\"output\">{{ historic.videolist.length }}</span>\n                        <span *ngIf=\"!historic\" class=\"output\">0</span>\n                    </div>\n\n                    <!-- Total time playlist-->\n                    <div class=\"headerItem\">\n                        <span>Total time: </span>\n                        <span class=\"output\">{{ totalDurationHistoric | duration:true }}</span>\n                    </div>\n                </div>\n\n\n                <!-- Playlist default -->\n                <div *ngIf=\"!playlist && activePlaylist === 'Playlist'\" id=\"headerBox\">\n                    <div id=\"headerPlaylistTitle\" class=\"noPlaylist\">\n                        <div class=\"noPlaylistText\">No playlist loaded</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Playlist -->\n        <div class=\"editPlaylistContent\" #autoscrollLeft>\n        <div *ngIf=\"playlist && activePlaylist === 'Playlist'\" class=\"playlist\" [dragula]=\"'drag-drop-list'\" [dragulaModel]=\"videolist\" [attr.data-accept-drop]=\"true\">\n\n            <!-- Drop hint -->\n            <div *ngIf=\"playlist.videolist.length < 1\" id=\"dropInfos\" class=\"dropInfos\" [attr.data-movable]=\"false\">\n                <div>Search videos &#8594;</div>\n                <div>and drag and drop item here &#8595;</div>\n                <!--\n                <div *ngIf=\"playlist.title === 'Default'\">\n                -->\n                <!-- Login button -->\n                <div *ngIf=\"playlist.title === 'Default' && _electron.isElectronApp\"><br>\n                    <div>Or\n                    <button id=\"playlistLoginBtn\" class=\"signBtn\" md-button (click)=\"login()\">\n                    <fa aria-label=\"Login\" [name]=\"'sign-in'\" [size]=\"1\"></fa>\n                    <span>Login</span>\n                    </button>\n                    </div>\n                    <div>to load your playlist(s) from youtube</div>\n                    \n                </div>\n            </div>\n            \n            <li *ngFor=\"let video of playlist.videolist\" class=\"videoItem\" [attr.data-id]=\"video.id\" [attr.data-movable]=\"true\" >\n                \n                <!-- Playlist item base -->\n                <app-playlist-item class=\"videoInfos\" [video]=\"video\"></app-playlist-item>\n\n                <!-- Only delete btn Edit panel -->\n                <div *ngIf=\"type === 'edit'\">\n                    <!-- Delete video button -->\n                    <button mdTooltip=\"Delete video!\" [mdTooltipPosition]=\"'above'\" md-mini-fab color=\"warn\" (click)=\"deleteVideo(video.id)\" class=\"deleteBtn\">\n                        <fa [name]=\"'trash'\" [size]=\"2\"></fa>\n                    </button>\n                </div>\n\n                <!-- All btn Player control -->\n                <div *ngIf=\"type === 'player'\" class=\"videoControl\">\n                    <!-- Play at left button -->\n                    <button mdTooltip=\"Play at left !\" [mdTooltipPosition]=\"'above'\" md-mini-fab color=\"primary\" (click)=\"playVideo(video, 'left')\" class=\"leftBtn mix-btn\">\n                    <fa [name]=\"'play'\" [size]=\"2\" [rotate]=\"180\" ></fa>\n                    </button>\n                    \n                    <!-- Delete video button -->\n                    <button mdTooltip=\"Delete video!\" [mdTooltipPosition]=\"'above'\"  md-mini-fab color=\"warn\" (click)=\"deleteVideo(video.id)\" class=\"mix-btn\">\n                    <fa [name]=\"'trash'\" [size]=\"2\"></fa>\n                    </button>\n\n                    <!-- Play at right button -->\n                    <button mdTooltip=\"Play at right !\" [mdTooltipPosition]=\"'above'\" md-mini-fab color=\"primary\" (click)=\"playVideo(video, 'right')\" class=\"rightBtn mix-btn\">\n                    <fa [name]=\"'play'\" [size]=\"2\" ></fa>\n                    </button>\n                </div>\n            </li>\n        </div>\n\n        <div *ngIf=\"historic && activePlaylist === 'Historic'\" class=\"onPlayHistoricPlaylist\">\n            \n            <li *ngFor=\"let video of historic.videolist\" class=\"videoItem\" [attr.data-id]=\"video.id\" [attr.data-movable]=\"true\" >\n                \n                <!-- Playlist item base -->\n                <app-playlist-item class=\"videoInfos\" [video]=\"video\"></app-playlist-item>\n\n                <!-- Only delete btn Edit panel -->\n                <div *ngIf=\"type === 'edit'\">\n                    <!-- Delete video button -->\n                    <button mdTooltip=\"Delete video!\" [mdTooltipPosition]=\"'above'\" md-mini-fab color=\"warn\" (click)=\"deleteVideo(video.id)\" class=\"deleteBtn\">\n                        <fa [name]=\"'trash'\" [size]=\"2\"></fa>\n                    </button>\n                </div>\n\n                <!-- All btn Player control -->\n                <div *ngIf=\"type === 'player'\" class=\"videoControl\">\n                    <!-- Add to playlist button -->\n                    <button mdTooltip=\"Replace in playlist!\" [mdTooltipPosition]=\"'above'\" md-mini-fab color=\"primary\" (click)=\"addToPlaylist(video)\" class=\"leftBtn mix-btn\">\n                    <fa [name]=\"'reply'\" [size]=\"2\"></fa>\n                    </button>\n                    \n                    <!-- Delete video button -->\n                    <button mdTooltip=\"Delete video!\" [mdTooltipPosition]=\"'above'\"  md-mini-fab color=\"warn\" (click)=\"deleteVideoHistoric(video.id)\" class=\"mix-btn\">\n                    <fa [name]=\"'trash'\" [size]=\"2\"></fa>\n                    </button>\n                </div>\n            </li>\n        </div>\n    </div>\n    </div>\n\n    <!-- Right playlist (search result) -->\n    <div class=\"editPlaylistBoxRight editPlaylistBox\">\n        \n        <!-- Header (Search bar) -->\n        <div class=\"editPlaylistHeader\">\n            <app-search-bar></app-search-bar>\n        </div>\n\n        <!-- Playlist (Search results) -->\n        <div class=\"editPlaylistContent\" #autoscrollRight>\n            <div *ngIf=\"searchResultsList\" class=\"playlist\" [dragula]=\"'drag-drop-list'\" [dragulaModel]=\"searchResultsList\" [attr.data-accept-drop]=\"false\">\n                \n                <li *ngFor=\"let video of searchResultsList\" class=\"videoItem\" [attr.data-id]=\"video.id\" [attr.data-movable]=\"true\" >\n                <app-playlist-item class=\"videoInfos\" [video]=\"video\"></app-playlist-item>\n                </li>\n            \n            </div>\n        </div>\n\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPlaylistComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__ = __webpack_require__("../../../../ng2-dragula/ng2-dragula.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dom_autoscroller__ = __webpack_require__("../../../../dom-autoscroller/dist/bundle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dom_autoscroller___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dom_autoscroller__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_playlist_model__ = __webpack_require__("../../../../../src/app/_shared/models/playlist.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_player_service__ = __webpack_require__("../../../../../src/app/_core/services/player.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_utils_service__ = __webpack_require__("../../../../../src/app/_core/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_auth_service__ = __webpack_require__("../../../../../src/app/_core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_services_tabs_service__ = __webpack_require__("../../../../../src/app/_core/services/tabs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EditPlaylistComponent = (function () {
    function EditPlaylistComponent(utils, tabsService, _electron, _authService, _playlistService, _playerService, _dragulaService) {
        var _this = this;
        this.utils = utils;
        this.tabsService = tabsService;
        this._electron = _electron;
        this._authService = _authService;
        this._playlistService = _playlistService;
        this._playerService = _playerService;
        this._dragulaService = _dragulaService;
        this.dragulaBagName = 'drag-drop-list';
        this.totalDuration = 0;
        this.totalDurationHistoric = 0;
        this.activePlaylist = 'Playlist';
        // Get user
        this._authService.user$
            .subscribe(function (user) {
            _this.user = user;
        });
        // Get on play Historic playlist
        this._playlistService.setOnPlayHistoricPlayList(new __WEBPACK_IMPORTED_MODULE_3__models_playlist_model__["a" /* Playlist */]('', 'Historic', '', '', 0, 0, '', '', true, new Array()));
        this._playlistService.onPlayHistoricPlaylist$
            .subscribe(function (historicPlaylist) {
            _this.historic = historicPlaylist;
            _this.totalDurationHistoric = _this.computeTotalDuration(_this.historic.videolist);
        });
        // Get search result list
        this._playlistService.searchResultPlaylist$
            .subscribe(function (searchResultsList) {
            _this.searchResultsList = searchResultsList;
            // Set autoscroll on drag
            // at begin or end of playlist container
            var scroll = __WEBPACK_IMPORTED_MODULE_2_dom_autoscroller__([
                _this.autoscrollLeft.nativeElement,
                _this.autoscrollRight.nativeElement,
            ], {
                margin: 70,
                maxSpeed: 6,
                scrollWhenOutside: true,
                autoScroll: function () { return scroll.down; }
            });
        });
    }
    EditPlaylistComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Init dragula service options
        var that = this;
        this._dragulaService.setOptions(this.dragulaBagName, {
            revertOnSpill: true,
            moves: function (el, source, handle, sibling) {
                return el.dataset.movable === 'true';
            },
            copy: function (el, source) {
                return source.dataset.acceptDrop === 'false';
            },
            accepts: function (el, target, source, sibling) {
                // Prevent duplicate
                var accept = true;
                that.videolist.forEach(function (video) {
                    if (el.dataset.id === video.id) {
                        accept = false;
                    }
                });
                return (accept && target.dataset.acceptDrop === 'true');
            },
        });
        // Prevent animation on drag
        this._dragulaService.drag.subscribe(function (value) {
            // value[1].children[0].children[0].children[0].children[1].style.marginLeft = 2;
            // console.log('value', value[1].children[0].children[0].children[0].children[1].style.marginLeft);
        });
        // Update playlist videolist model on drop
        this._dragulaService.dropModel.subscribe(function (args) {
            var pl = _this.utils.copyPlaylist(_this.playlist, _this.videolist);
            _this.setPlaylist(pl);
        });
        /*
        this.dragulaService.dragend.subscribe((el) => {
        });
        this.dragulaService.over.subscribe((val) => {
        });
        */
    };
    EditPlaylistComponent.prototype.ngOnDestroy = function () {
        console.log('Yo dstroy');
        // Destroy dragula service
        if (!!this._dragulaService.find(this.dragulaBagName)) {
            this._dragulaService.destroy(this.dragulaBagName);
        }
    };
    EditPlaylistComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.playlist && changes.playlist.currentValue) {
            // Set videolist from input playlist
            this.videolist = changes.playlist.currentValue.videolist;
            // Update total duration on change
            this.totalDuration = this.computeTotalDuration(this.videolist);
        }
        if (changes && changes.playlist && !changes.playlist.currentValue) {
            this.playlist = new __WEBPACK_IMPORTED_MODULE_3__models_playlist_model__["a" /* Playlist */]('', 'Default', '', '', 0, 0, '', '', true, new Array());
            this.videolist = this.playlist.videolist;
        }
    };
    //  Delete video
    EditPlaylistComponent.prototype.deleteVideo = function (videoId) {
        if (videoId) {
            var pl = this.utils.copyPlaylist(this.playlist);
            pl.videolist = pl.videolist.filter(function (el) {
                return el.id !== videoId;
            });
            this.setPlaylist(pl);
        }
    };
    //  Delete video
    EditPlaylistComponent.prototype.deleteVideoHistoric = function (videoId) {
        if (videoId) {
            var pl = this.utils.copyPlaylist(this.historic);
            pl.videolist = pl.videolist.filter(function (el) {
                return el.id !== videoId;
            });
            this._playlistService.setOnPlayHistoricPlayList(pl);
        }
    };
    EditPlaylistComponent.prototype.addToPlaylist = function (video) {
        var pl = this.utils.copyPlaylist(this.playlist);
        pl.videolist.push(video);
        this._playlistService.setOnPlayPlayList(pl);
    };
    // Play video
    EditPlaylistComponent.prototype.playVideo = function (video, side) {
        if (this.type === 'player') {
            if (side === 'left') {
                this._playerService.setPlayerLeft(video);
            }
            if (side === 'right') {
                this._playerService.setPlayerRight(video);
            }
        }
    };
    EditPlaylistComponent.prototype.setPlaylist = function (playlist) {
        if (playlist) {
            if (this.type === 'player') {
                this._playlistService.setOnPlayPlayList(playlist);
            }
            else if (this.type === 'edit') {
                this._playlistService.setOnEditPlayList(playlist);
            }
        }
    };
    EditPlaylistComponent.prototype.changePlaylist = function () {
        this.activePlaylist = this.activePlaylist === 'Historic' ? 'Playlist' : 'Historic';
    };
    EditPlaylistComponent.prototype.login = function () {
        if (this._electron.isElectronApp) {
            this._authService.login();
            this.tabsService.setSelectedTab(1);
        }
    };
    EditPlaylistComponent.prototype.computeTotalDuration = function (videolist) {
        if (videolist) {
            var totalDuration_1 = 0;
            videolist.forEach(function (el) {
                totalDuration_1 += el.duration;
            });
            return totalDuration_1;
        }
        return 0;
    };
    return EditPlaylistComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoscrollLeft'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], EditPlaylistComponent.prototype, "autoscrollLeft", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoscrollRight'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], EditPlaylistComponent.prototype, "autoscrollRight", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__models_playlist_model__["a" /* Playlist */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_playlist_model__["a" /* Playlist */]) === "function" && _c || Object)
], EditPlaylistComponent.prototype, "playlist", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EditPlaylistComponent.prototype, "type", void 0);
EditPlaylistComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-playlist',
        template: __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.component.css")],
        viewProviders: [__WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__["DragulaService"]]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__core_services_utils_service__["a" /* UtilsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_services_utils_service__["a" /* UtilsService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__core_services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__core_services_tabs_service__["a" /* TabsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_electron__["a" /* ElectronService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_electron__["a" /* ElectronService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__core_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__core_services_auth_service__["a" /* AuthService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__core_services_playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_services_playlist_service__["a" /* PlaylistService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__core_services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_services_player_service__["a" /* PlayerService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__["DragulaService"]) === "function" && _k || Object])
], EditPlaylistComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=edit-playlist.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPlaylistModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/_shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_playlist_component__ = __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playlist_item_playlist_item_component__ = __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/playlist-item/playlist-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_bar_search_bar_component__ = __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/search-bar/search-bar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var EditPlaylistModule = (function () {
    function EditPlaylistModule() {
    }
    return EditPlaylistModule;
}());
EditPlaylistModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__edit_playlist_component__["a" /* EditPlaylistComponent */],
            __WEBPACK_IMPORTED_MODULE_4__playlist_item_playlist_item_component__["a" /* PlaylistItemComponent */],
            __WEBPACK_IMPORTED_MODULE_5__search_bar_search_bar_component__["a" /* SearchBarComponent */]
        ], exports: [
            __WEBPACK_IMPORTED_MODULE_3__edit_playlist_component__["a" /* EditPlaylistComponent */]
        ]
    })
], EditPlaylistModule);

//# sourceMappingURL=edit-playlist.module.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/playlist-item/playlist-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".videoListItem {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    width: 100%;\n    height: 96px;\n    position: relative;\n    color: white;\n    overflow: hidden;\n}\n.videoListItem .thumb .vinyl {\n    position: absolute;\n    border: 30px solid black;\n    border-radius: 50px;\n    height: 34px;\n    width: 34px;\n    transition: all ease-in-out 0.2s;\n    box-shadow: 0px 0px 1px 0px rgba(255,255,255,1);\n}\n\n.videoListItem .thumb .vinyl img {\n    border: 2px solid white;\n    border-radius: 50px;\n    height: 30px;\n    width: 30px;\n}\n\n.videoListItem .thumb .pochette {\n    overflow: hidden;\n    height: 96px;\n    width: 96px;\n    position: absolute;\n    transition: all ease-in-out 0.2s;\n    opacity: 1;\n    box-shadow: 0px 0px 1px 0px rgba(255,255,255,1);\n}\n\n.videoListItem:hover .thumb .pochette {\n    box-shadow: none;\n    margin-left: -20px;\n}\n\n.videoListItem:hover .thumb .vinyl{\n    margin-left: 20px;\n}\n\n.videoListItem .thumb .pochette img {\n    height: 96px;\n    width: 96px;\n}\n\n.description {\n    padding: 5px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin-left: 120px;\n}\n\n.description div {\n    margin: 0;\n    font-size: 0.8rem;\n    line-height: 24px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    overflow-wrap: break-word;\n    -ms-word-break: break-all;\n    word-break: break-all;\n     word-break: break-word;\n    -webkit-hyphens: auto;\n        -ms-hyphens: auto;\n            hyphens: auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/playlist-item/playlist-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"videoListItem\">\n    <div class=\"thumb\">\n        <div class=\"vinyl\"><img    [attr.src]=\"handleThumUrl(video.thumbUrl, 'vinyl')\" (onError)=\"this.src=handleThumUrl(video.thumbUrl, 'vinyl')\"/></div>\n        <div class=\"pochette\"><img [attr.src]=\"handleThumUrl(video.thumbUrl, 'pochette')\" (onError)=\"this.src=handleThumUrl(video.thumbUrl, 'pochette')\"/></div>\n    </div>\n    <div class=\"description\">\n        <div>{{video.title}}</div>\n        <!--\n        <p>{{video.description}}</p>\n        -->\n        <div>{{video.duration | duration}}</div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/playlist-item/playlist-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_video_model__ = __webpack_require__("../../../../../src/app/_shared/models/video.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PlaylistItemComponent = (function () {
    function PlaylistItemComponent() {
        this.defaultThumb = 'assets/images/mix.png';
    }
    PlaylistItemComponent.prototype.handleThumUrl = function (thumbUrl, type) {
        if (thumbUrl.indexOf('jpg') === -1) {
            return 'assets/images/' + type + '.png';
        }
        return thumbUrl;
    };
    return PlaylistItemComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_video_model__["a" /* Video */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_video_model__["a" /* Video */]) === "function" && _a || Object)
], PlaylistItemComponent.prototype, "video", void 0);
PlaylistItemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-playlist-item',
        template: __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/playlist-item/playlist-item.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/playlist-item/playlist-item.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PlaylistItemComponent);

var _a;
//# sourceMappingURL=playlist-item.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/search-bar/search-bar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#searchBar {\n    position: relative;\n    font-size: 1rem;\n}\n\n/* Search box */\n#searchBox {\n    font-size: 1rem;\n    margin: 0 auto;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n\n#searchBox input[type='text'] {\n    padding: 4px;\n    width: calc(100% - 108px);\n    height: 24px;\n    border: 1px solid transparent;\n    z-index: 5;\n    font-size: 1rem;\n}\n#searchBox input[type='text']:focus {\n    outline: none !important;\n    border: 1px solid #6398ed;\n    box-shadow: inset 0 0 2px #6398ed;\n}\n\n#searchBox input[type='button'] {\n    padding: 5px;\n    width: 100px;\n    height: auto;\n    border: none;\n}\n\n/* Suggests box */\n#suggestsBox {\n    color: black;\n    background-color: white;\n    z-index: 2;\n    position: absolute;\n    min-height: 0px;\n    height: 280px;\n    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);\n}\n\n.suggestItem {\n    padding-top: 2px;\n    padding-right: 2px;\n    padding-bottom: 2px;\n    padding-left: 3px;\n    font-size: 0.8rem;\n\n    cursor: pointer;\n    height: 24px;\n    line-height: 24px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n\n}\n.suggestItem:hover {\n    background-color: lightgray;\n}\n\n.suggestItem img {\n    \n}\n.active {\n    background-color: darkgray;\n}\n\n.suggestItem div {\n    height: 24px;\n}\n\n.suggestItem .suggestText,\n.suggestItem .suggestText b {\n    height: 24px;\n    line-height: 24px;\n    overflow: hidden;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/search-bar/search-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"searchBar\" (keydown)=\"keyDown($event)\">\n    <div id=\"searchBox\">\n        <input [formControl]=\"search\" type=\"text\" name=\"searchBar\" placeholder=\"Search videos...\">\n        <input type=\"button\" name=\"searchBtn\" value=\"search\">\n    </div>\n\n    <div id=\"suggestsBox\" *ngIf=\"query && query !== selectedSugest\">\n        <div *ngFor=\"let suggest of suggestsResult; let i = index\" [class.active]=\"i == arrowkeyLocation\" class=\"suggestItem\" (click)=\"selectSuggestion(query + suggest)\">\n            <!-- img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iI2JkYmRiZCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" /-->\n            <div class=\"suggestText\">{{ query }}<b>{{ suggest }}</b></div>\n        </div>\n    </div>\n\n    <div *ngIf=\"suggestsResult?.length < 1 && query\">\n        <hr>\n        <p>No results found :(</p>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/_shared/modules/edit-playlist/search-bar/search-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_video_model__ = __webpack_require__("../../../../../src/app/_shared/models/video.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_youtube_service__ = __webpack_require__("../../../../../src/app/_core/services/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_suggests_model__ = __webpack_require__("../../../../../src/app/_shared/models/suggests.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_suggest_service__ = __webpack_require__("../../../../../src/app/_core/services/suggest.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SearchBarComponent = (function () {
    function SearchBarComponent(_suggestService, _playlistService, _youtubeService) {
        var _this = this;
        this._suggestService = _suggestService;
        this._playlistService = _playlistService;
        this._youtubeService = _youtubeService;
        this.search = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.arrowkeyLocation = 0;
        // Get suggests results
        this._suggestService.suggestsResult$.subscribe(function (suggestsResult) {
            _this.query = suggestsResult.query;
            _this.suggestsResult = suggestsResult.suggests;
        });
    }
    SearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Search suggests when user type in search bar
        this.search.valueChanges
            .debounceTime(200)
            .switchMap(function (query) {
            if (query && query !== _this.selectedSugest) {
                return _this._suggestService.searchSuggestsVideo(query);
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].empty();
            }
        })
            .subscribe(function (sr) {
            var acList = [];
            sr[1].forEach(function (item) {
                acList.push(item[0].replace(sr[0], ''));
            });
            var suggests = new __WEBPACK_IMPORTED_MODULE_7__models_suggests_model__["a" /* Suggests */](sr[0], acList);
            // Clear playlist if no value
            if (_this.search.value === '') {
                _this._suggestService.setSuggestsResult({});
            }
            else {
                _this._suggestService.setSuggestsResult(suggests);
            }
        });
    };
    // Select suggest
    SearchBarComponent.prototype.selectSuggestion = function (suggest) {
        this._suggestService.setSuggestsResult({});
        this.selectedSugest = suggest;
        this.search.setValue(suggest);
        this.searchSuggestion(suggest);
    };
    // Search videos by selected suggest
    SearchBarComponent.prototype.searchSuggestion = function (suggest) {
        var _this = this;
        this._youtubeService.searchVideos(suggest)
            .subscribe(function (results) {
            // Clear playlist if no value
            if (_this.search.value === '') {
                _this._playlistService.setSearchResultPlaylist([]);
            }
            else {
                var videoList = results.items.map(function (item) {
                    return new __WEBPACK_IMPORTED_MODULE_4__models_video_model__["a" /* Video */](item.id, item.snippet.title, item.snippet.description, item.snippet.thumbnails.default.url, __WEBPACK_IMPORTED_MODULE_3_moment__["duration"](item.contentDetails.duration).asMilliseconds());
                });
                _this._playlistService.setSearchResultPlaylist(videoList);
            }
        });
    };
    // Handle keyboard key
    SearchBarComponent.prototype.keyDown = function (event) {
        if (this.suggestsResult) {
            switch (event.keyCode) {
                case 38:
                    this.arrowkeyLocation--;
                    this.checkArrowKeyLocation();
                    break;
                case 40:
                    this.arrowkeyLocation++;
                    this.checkArrowKeyLocation();
                    break;
                case 13:
                    var suggest = this.query.toString() + this.suggestsResult[this.arrowkeyLocation];
                    this.selectSuggestion(suggest);
                    break;
            }
        }
    };
    // Handle arrow key in suggest popup
    SearchBarComponent.prototype.checkArrowKeyLocation = function () {
        if (this.arrowkeyLocation < 0) {
            this.arrowkeyLocation = 0;
        }
        else if (this.arrowkeyLocation > this.suggestsResult.length - 1) {
            this.arrowkeyLocation = this.suggestsResult.length - 1;
        }
    };
    return SearchBarComponent;
}());
SearchBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-bar',
        template: __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/search-bar/search-bar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/search-bar/search-bar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__core_services_suggest_service__["a" /* SuggestService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__core_services_suggest_service__["a" /* SuggestService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__core_services_playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_services_playlist_service__["a" /* PlaylistService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__core_services_youtube_service__["a" /* YoutubeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_services_youtube_service__["a" /* YoutubeService */]) === "function" && _c || Object])
], SearchBarComponent);

var _a, _b, _c;
//# sourceMappingURL=search-bar.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/material/custom-material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomMaterialModule = (function () {
    function CustomMaterialModule() {
    }
    return CustomMaterialModule;
}());
CustomMaterialModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdAutocompleteModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdButtonToggleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdCardModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MdCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MdChipsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MdDatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MdExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MdGridListModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MdListModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["q" /* MdMenuModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MdPaginatorModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["s" /* MdProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["t" /* MdProgressSpinnerModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["u" /* MdRadioModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["v" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["w" /* MdSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["y" /* MdSliderModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["x" /* MdSlideToggleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["z" /* MdSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["A" /* MdSortModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["B" /* MdTableModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["C" /* MdTabsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["D" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["E" /* MdTooltipModule */],
        ],
        declarations: []
    })
], CustomMaterialModule);

//# sourceMappingURL=custom-material.module.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/ng2-youtube-player/models.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=models.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/ng2-youtube-player/modules/ng2-youtube-player.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__youtube_player_component__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/modules/youtube-player.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_youtube_player_service__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/services/youtube-player.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var YoutubePlayerModule = (function () {
    function YoutubePlayerModule() {
    }
    return YoutubePlayerModule;
}());
YoutubePlayerModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__youtube_player_component__["a" /* YoutubePlayerComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__youtube_player_component__["a" /* YoutubePlayerComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__services_youtube_player_service__["a" /* YoutubePlayerService */]
        ]
    })
], YoutubePlayerModule);

//# sourceMappingURL=ng2-youtube-player.module.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/ng2-youtube-player/modules/youtube-player.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_youtube_player_service__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/services/youtube-player.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YoutubePlayerComponent = (function () {
    function YoutubePlayerComponent(playerService, elementRef) {
        this.playerService = playerService;
        this.elementRef = elementRef;
        this.videoId = '';
        /**
         * @description sets the protocol by the navigator object
         * if there is no window, it sets a default http protocol
         * unless the protocol is set from outside
         */
        this.protocol = this.getProtocol();
        this.playerVars = {};
        // player created and initialized - sends instance of the player
        this.ready = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // state change: send the YT event with its state
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    YoutubePlayerComponent.prototype.ngOnInit = function () {
    };
    YoutubePlayerComponent.prototype.ngAfterContentInit = function () {
        var htmlId = this.playerService.generateUniqueId();
        var playerSize = { height: this.height, width: this.width };
        this.ytPlayerContainer.nativeElement.setAttribute('id', htmlId);
        this.playerService.loadPlayerApi({
            protocol: this.protocol
        });
        this.playerService.setupPlayer(htmlId, {
            change: this.change,
            ready: this.ready,
        }, playerSize, this.videoId, this.playerVars);
    };
    YoutubePlayerComponent.prototype.getProtocol = function () {
        var hasWindow = window && window.location;
        var protocol = hasWindow
            ? window.location.protocol.replace(':', '')
            : 'http';
        protocol = protocol === 'file' ? 'http' : protocol;
        return protocol;
    };
    return YoutubePlayerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "videoId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], YoutubePlayerComponent.prototype, "height", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], YoutubePlayerComponent.prototype, "width", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], YoutubePlayerComponent.prototype, "protocol", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "playerVars", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "ready", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "change", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ytPlayerContainer'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], YoutubePlayerComponent.prototype, "ytPlayerContainer", void 0);
YoutubePlayerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        selector: 'app-youtube-player',
        template: "\n      <div id=\"yt-player-ng2-component\" #ytPlayerContainer></div>\n    ",
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object])
], YoutubePlayerComponent);

var _a, _b, _c;
//# sourceMappingURL=youtube-player.component.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/ng2-youtube-player/ng2-youtube-player.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_ng2_youtube_player_module__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/modules/ng2-youtube-player.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__modules_ng2_youtube_player_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_youtube_player_component__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/modules/youtube-player.component.ts");
/* unused harmony reexport YoutubePlayerComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models__);
/* unused harmony reexport IPlayerApiScriptOptions */
/* unused harmony reexport IPlayerOutputs */
/* unused harmony reexport IPlayerSize */
// Public classes.



//# sourceMappingURL=ng2-youtube-player.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/modules/ng2-youtube-player/services/youtube-player.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YoutubePlayerService = YoutubePlayerService_1 = (function () {
    function YoutubePlayerService(zone) {
        this.zone = zone;
        this.isFullscreen = false;
        this.defaultSizes = {
            height: 270,
            width: 367
        };
        this.createApi();
    }
    Object.defineProperty(YoutubePlayerService, "win", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YoutubePlayerService, "YT", {
        get: function () {
            return YoutubePlayerService_1.win['YT'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YoutubePlayerService, "Player", {
        get: function () {
            return YoutubePlayerService_1.YT.Player;
        },
        enumerable: true,
        configurable: true
    });
    YoutubePlayerService.prototype.loadPlayerApi = function (options) {
        var doc = YoutubePlayerService_1.win.document;
        var playerApiScript = doc.createElement('script');
        playerApiScript.type = 'text/javascript';
        playerApiScript.src = options.protocol + "://www.youtube.com/iframe_api";
        // playerApiScript.src = `https://www.youtube.com/iframe_api`;
        doc.body.appendChild(playerApiScript);
    };
    YoutubePlayerService.prototype.setupPlayer = function (elementId, outputs, sizes, videoId, playerVars) {
        var _this = this;
        if (videoId === void 0) { videoId = ''; }
        var createPlayer = function () {
            if (YoutubePlayerService_1.win) {
                _this.createPlayer(elementId, outputs, sizes, videoId, playerVars);
            }
        };
        this.api.subscribe(createPlayer);
    };
    YoutubePlayerService.prototype.play = function (player) {
        player.playVideo();
    };
    YoutubePlayerService.prototype.pause = function (player) {
        player.pauseVideo();
    };
    YoutubePlayerService.prototype.playVideo = function (media, player) {
        var id = media.id.videoId ? media.id.videoId : media.id;
        player.loadVideoById(id);
        this.play(player);
    };
    YoutubePlayerService.prototype.isPlaying = function (player) {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        var isPlayerReady = player && player.getPlayerState;
        var playerState = isPlayerReady ? player.getPlayerState() : {};
        var isPlayerPlaying = isPlayerReady
            ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
            : false;
        return isPlayerPlaying;
    };
    YoutubePlayerService.prototype.createPlayer = function (elementId, outputs, sizes, videoId, playerVars) {
        var _this = this;
        if (videoId === void 0) { videoId = ''; }
        if (playerVars === void 0) { playerVars = {}; }
        var service = this;
        var playerSize = {
            height: sizes.height || this.defaultSizes.height,
            width: sizes.width || this.defaultSizes.width
        };
        return new YoutubePlayerService_1.Player(elementId, Object.assign({}, playerSize, {
            events: {
                onReady: function (ev) {
                    _this.zone.run(function () { return outputs.ready && outputs.ready.next(ev.target); });
                },
                onStateChange: function (ev) {
                    _this.zone.run(function () { return outputs.change && outputs.change.next(ev); });
                    // this.zone.run(() => onPlayerStateChange(ev));
                }
            },
            videoId: videoId,
            playerVars: playerVars,
        }));
        // TODO: DEPRECATE?
        // function onPlayerStateChange (event: any) {
        //   const state = event.data;
        //   const PlayerState = YoutubePlayerService.YT.PlayerState;
        //   // play the next song if its not the end of the playlist
        //   // should add a "repeat" feature
        //   if (state === PlayerState.ENDED) {
        //   }
        //   if (state === PlayerState.PAUSED) {
        //       // service.playerState = PlayerState.PAUSED;
        //   }
        //   if (state === PlayerState.PLAYING) {
        //       // service.playerState = PlayerState.PLAYING;
        //   }
        // }
    };
    YoutubePlayerService.prototype.toggleFullScreen = function (player, isFullScreen) {
        var _a = this.defaultSizes, height = _a.height, width = _a.width;
        if (!isFullScreen) {
            height = window.innerHeight;
            width = window.innerWidth;
        }
        player.setSize(width, height);
        // TODO: dispatch event
    };
    // adpoted from uid
    YoutubePlayerService.prototype.generateUniqueId = function () {
        var len = 7;
        return Math.random().toString(35).substr(2, len);
    };
    YoutubePlayerService.prototype.createApi = function () {
        var _this = this;
        this.api = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        var onYouTubeIframeAPIReady = function () {
            if (YoutubePlayerService_1.win) {
                _this.api.next(YoutubePlayerService_1.YT);
            }
        };
        YoutubePlayerService_1.win['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;
    };
    return YoutubePlayerService;
}());
YoutubePlayerService = YoutubePlayerService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _a || Object])
], YoutubePlayerService);

var YoutubePlayerService_1, _a;
//# sourceMappingURL=youtube-player.service.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/pipes/duration.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DurationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DurationPipe = (function () {
    function DurationPipe() {
    }
    DurationPipe.prototype.transform = function (value, args) {
        if (!value && value !== 0) {
            return;
        }
        var format = 'mm:ss';
        if (args) {
            format = 'HH:mm:ss';
        }
        return __WEBPACK_IMPORTED_MODULE_1_moment__["utc"](value).format(format);
    };
    return DurationPipe;
}());
DurationPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'duration' })
], DurationPipe);

//# sourceMappingURL=duration.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/pipes/filter-playlist.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPlaylistPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterPlaylistPipe = (function () {
    function FilterPlaylistPipe() {
    }
    FilterPlaylistPipe.prototype.transform = function (items, title) {
        if (!items || !title) {
            return items;
        }
        return items.filter(function (item) { return item.title.indexOf(title) !== -1; });
    };
    return FilterPlaylistPipe;
}());
FilterPlaylistPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'filterPlaylist',
        pure: false
    })
], FilterPlaylistPipe);

//# sourceMappingURL=filter-playlist.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__ = __webpack_require__("../../../../ng2-dragula/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_fontawesome_angular2_fontawesome__ = __webpack_require__("../../../../angular2-fontawesome/angular2-fontawesome.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_fontawesome_angular2_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_fontawesome_angular2_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_material_custom_material_module__ = __webpack_require__("../../../../../src/app/_shared/modules/material/custom-material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__playlist_panel_create_playlist_dialog_create_playlist_dialog_component__ = __webpack_require__("../../../../../src/app/playlist-panel/create-playlist-dialog/create-playlist-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_help_dialog_help_dialog_component__ = __webpack_require__("../../../../../src/app/login/help-dialog/help-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_range_slider_2_range_slider_2_component__ = __webpack_require__("../../../../../src/app/_shared/components/range-slider-2/range-slider-2.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_video_player_video_player_component__ = __webpack_require__("../../../../../src/app/_shared/components/video-player/video-player.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_click_outside_directive__ = __webpack_require__("../../../../../src/app/_shared/directives/click-outside.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_duration_pipe__ = __webpack_require__("../../../../../src/app/_shared/pipes/duration.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipes_filter_playlist_pipe__ = __webpack_require__("../../../../../src/app/_shared/pipes/filter-playlist.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modules_ng2_youtube_player_ng2_youtube_player__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/ng2-youtube-player.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// External modules




// Shared components





// Directives

// pipes


// Ng2 you tube player

var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_9__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_10__playlist_panel_create_playlist_dialog_create_playlist_dialog_component__["a" /* CreatePlaylistDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_11__login_help_dialog_help_dialog_component__["a" /* HelpDialogComponent */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_14__directives_click_outside_directive__["a" /* ClickOutsideDirective */],
            __WEBPACK_IMPORTED_MODULE_15__pipes_duration_pipe__["a" /* DurationPipe */],
            __WEBPACK_IMPORTED_MODULE_16__pipes_filter_playlist_pipe__["a" /* FilterPlaylistPipe */],
            __WEBPACK_IMPORTED_MODULE_9__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_10__playlist_panel_create_playlist_dialog_create_playlist_dialog_component__["a" /* CreatePlaylistDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_11__login_help_dialog_help_dialog_component__["a" /* HelpDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_range_slider_2_range_slider_2_component__["a" /* RangeSlider2Component */],
            __WEBPACK_IMPORTED_MODULE_13__components_video_player_video_player_component__["a" /* VideoPlayerComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* NoopAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__["DragulaModule"],
            __WEBPACK_IMPORTED_MODULE_6_angular2_fontawesome_angular2_fontawesome__["Angular2FontawesomeModule"],
            __WEBPACK_IMPORTED_MODULE_7_ngx_electron__["b" /* NgxElectronModule */],
            __WEBPACK_IMPORTED_MODULE_17__modules_ng2_youtube_player_ng2_youtube_player__["a" /* YoutubePlayerModule */],
            __WEBPACK_IMPORTED_MODULE_8__modules_material_custom_material_module__["a" /* CustomMaterialModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* NoopAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__["DragulaModule"],
            __WEBPACK_IMPORTED_MODULE_6_angular2_fontawesome_angular2_fontawesome__["Angular2FontawesomeModule"],
            __WEBPACK_IMPORTED_MODULE_7_ngx_electron__["b" /* NgxElectronModule */],
            __WEBPACK_IMPORTED_MODULE_17__modules_ng2_youtube_player_ng2_youtube_player__["a" /* YoutubePlayerModule */],
            __WEBPACK_IMPORTED_MODULE_14__directives_click_outside_directive__["a" /* ClickOutsideDirective */],
            __WEBPACK_IMPORTED_MODULE_15__pipes_duration_pipe__["a" /* DurationPipe */],
            __WEBPACK_IMPORTED_MODULE_16__pipes_filter_playlist_pipe__["a" /* FilterPlaylistPipe */],
            __WEBPACK_IMPORTED_MODULE_12__components_range_slider_2_range_slider_2_component__["a" /* RangeSlider2Component */],
            __WEBPACK_IMPORTED_MODULE_13__components_video_player_video_player_component__["a" /* VideoPlayerComponent */],
            __WEBPACK_IMPORTED_MODULE_8__modules_material_custom_material_module__["a" /* CustomMaterialModule */],
        ],
        providers: [],
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#appContainer {\n    height: 100%;\n}\n\n.tabsNav {\n    z-index: 5000;\n    margin: 0;\n    padding: 0;\n    height: 32px;\n    line-height: 32px;\n    border-bottom: 10px solid #f5f5f5;\n    background-color: lightgray;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    /*\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);\n    */\n}\n\n.tabsNav button {\n    font-size: 1rem;\n    width: 120px;\n    text-align: center;\n    cursor: pointer;\n    border: none;\n    outline: none;\n    height: 32px;\n    line-height: 32px;\n    background-color: transparent;\n    color: rgba(0,0,0,.87);\n    transition: all ease 100;\n}\n.tabsNav button:hover { background-color: #DEDEDE; }\n.tabsNav button.tabActive { background-color: #f5f5f5 !important; }\n\n.tabsContent {\n    height: calc(100% - 52px);\n    padding: 5px;\n    padding-top: 47px;\n}\n.tabContentCpnt {}\n\n\n/* App loader */\n.notOnline,\n.loader {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 99999;\n}\n.notOnline .textLoader {\n    padding-top: 230px;\n}\n\n.notOnline .textLoader .onlineText {\n    padding: 40px;\n    /*background-color: rgba(255, 255, 255, 0.6);*/\n}\n\n.bgLoader {\n    background-color: rgba(0, 0, 0, 0.5);\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 9999;\n}\n\n.textLoader {\n    text-align: center;\n    position: absolute;\n    width: 100%;\n    height: calc(100%);\n    color: #f5f5f5;\n    font-size: 2.5rem;\n    padding-top: 100px;\n}\n\n.appLoader {\n    text-align: center;\n    position: absolute;\n    z-index: 10;\n    margin-left: calc(50% - 100px);\n    padding-top: 165px;\n}\n\n.loader .mat-progress-spinner {\n    width: 200px !important;\n    height: 200px !important;\n}\n\n.blur { -webkit-filter: blur(5px); filter: blur(5px); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- App loader -->\n<div class=\"loader\" *ngIf=\"isLoading\">\n    <md-progress-spinner class=\"appLoader\" [mode]=\"'indeterminate'\"></md-progress-spinner>\n    <div class=\"textLoader\">Loading ...</div>\n</div>\n\n<div class=\"notOnline\" *ngIf=\"!isOnline\">\n    <div class=\"textLoader\"><span class=\"onlineText\">Check your internet connection!</span></div>\n</div>\n<div class=\"bgLoader\" *ngIf=\"!isOnline\"></div>\n<div class=\"bgLoader\" *ngIf=\"isLoading\"></div>\n\n<!-- App container-->\n<div [class.blur]=\"isLoading\" id=\"appContainer\">\n    \n    <!-- Login buttons and status -->\n    <app-login></app-login>\n\n    <!-- Navigation buttons -->\n    <div class=\"tabsNav\">\n        <button [class.tabActive]=\"selectedTab === 1\" (click)=\"changeTab(1)\">Playlist</button><!--\n     --><button [class.tabActive]=\"selectedTab === 2\" (click)=\"changeTab(2)\">Mix</button><!--\n     --><button [class.tabActive]=\"selectedTab === 3\" (click)=\"changeTab(3)\">Settings</button>\n    </div>\n\n    <!-- Content tabs -->\n    <div class=\"tabsContent\">\n        <app-playlist-panel [hidden]=\"selectedTab !== 1\" class=\"tabContentCpnt\"></app-playlist-panel>\n        <app-mix-panel      [hidden]=\"selectedTab !== 2\" class=\"tabContentCpnt\"></app-mix-panel>\n        <app-settings-panel [hidden]=\"selectedTab !== 3\" class=\"tabContentCpnt\"></app-settings-panel>\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_tabs_service__ = __webpack_require__("../../../../../src/app/_core/services/tabs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_online_service__ = __webpack_require__("../../../../../src/app/_core/services/online.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_modules_ng2_youtube_player_services_youtube_player_service__ = __webpack_require__("../../../../../src/app/_shared/modules/ng2-youtube-player/services/youtube-player.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(_onlineService, ytService, _tabsService) {
        var _this = this;
        this._onlineService = _onlineService;
        this.ytService = ytService;
        this._tabsService = _tabsService;
        this.isLoading = false;
        this.isOnline = false;
        this.defaultUserSettings = {
            theme: 'light',
        };
        // Check internet connection
        this._onlineService.isOnline$.subscribe(function (isOnline) {
            _this.isOnline = isOnline;
        });
        // TODO rework an 'REAL' app loader
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].timer(3000).subscribe(function (res) {
            _this.isLoading = false;
        });
        // Get selected tab
        this._tabsService.selectedTab$.subscribe(function (st) {
            _this.selectedTab = st;
        });
        this._tabsService.setSelectedTab(1);
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.initUserSettings = function () {
    };
    AppComponent.prototype.changeTab = function (tabIndex) {
        this._tabsService.setSelectedTab(tabIndex);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__core_services_online_service__["a" /* OnlineService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_services_online_service__["a" /* OnlineService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_modules_ng2_youtube_player_services_youtube_player_service__["a" /* YoutubePlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_modules_ng2_youtube_player_services_youtube_player_service__["a" /* YoutubePlayerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__core_services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_services_tabs_service__["a" /* TabsService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_core_module__ = __webpack_require__("../../../../../src/app/_core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("../../../../../src/app/_shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_modules_edit_playlist_edit_playlist_module__ = __webpack_require__("../../../../../src/app/_shared/modules/edit-playlist/edit-playlist.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mix_panel_mix_panel_component__ = __webpack_require__("../../../../../src/app/mix-panel/mix-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__playlist_panel_playlist_panel_component__ = __webpack_require__("../../../../../src/app/playlist-panel/playlist-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_panel_settings_panel_component__ = __webpack_require__("../../../../../src/app/settings-panel/settings-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Modules



// Components
// Root component

// Mix panel

// Playlist panel

// Settings panel

// Login component

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_4__core_core_module__["a" /* CoreModule */],
            __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_6__shared_modules_edit_playlist_edit_playlist_module__["a" /* EditPlaylistModule */]
        ],
        declarations: [
            // Root component
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            // Mix panel
            __WEBPACK_IMPORTED_MODULE_8__mix_panel_mix_panel_component__["a" /* MixPanelComponent */],
            // Playlist panel
            __WEBPACK_IMPORTED_MODULE_9__playlist_panel_playlist_panel_component__["a" /* PlaylistPanelComponent */],
            // Settings panel
            __WEBPACK_IMPORTED_MODULE_10__settings_panel_settings_panel_component__["a" /* SettingsPanelComponent */],
            // Login
            __WEBPACK_IMPORTED_MODULE_11__login_login_component__["a" /* LoginComponent */],
        ],
        exports: [],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/login/help-dialog/help-dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/help-dialog/help-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <h2 md-dialog-title>Turntable help</h2>\n    <md-dialog-content>\n\n        <md-tab-group>\n            <md-tab label=\"Playlist\">\n                Playlist help!\n            </md-tab>\n            \n            <md-tab label=\"Mix\">\n                Mix help!\n            </md-tab>\n\n            <md-tab label=\"Settings\">\n                Settings help!\n            </md-tab>\n        </md-tab-group>\n\n    </md-dialog-content>\n\n    <!-- Controls -->\n    <md-dialog-actions>\n        <button md-button (click)=\"onPreviousTips()\">Previous</button>\n        <button md-button (click)=\"onClose()\">Close</button>\n        <button md-button (click)=\"onNextTips()\">Next</button>\n    </md-dialog-actions>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/help-dialog/help-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var HelpDialogComponent = (function () {
    function HelpDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    HelpDialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    HelpDialogComponent.prototype.onPreviousTips = function () {
    };
    HelpDialogComponent.prototype.onNextTips = function () {
    };
    return HelpDialogComponent;
}());
HelpDialogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-help-dialog',
        template: __webpack_require__("../../../../../src/app/login/help-dialog/help-dialog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/help-dialog/help-dialog.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdDialogRef */]) === "function" && _a || Object, Object])
], HelpDialogComponent);

var _a;
//# sourceMappingURL=help-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loginContainer {\n    z-index: 6000;\n    position: fixed;\n    right: 0;\n    top: 0;\n    height: 32px;\n}\n\n#helpBtn {\n    margin: 0;\n    padding: 0;\n    cursor: pointer;\n    border: 0;\n    outline: none;\n    width: 32px;\n    height: 32px;\n    background-color: transparent;\n    border-radius: 0;\n}\n\n#helpBtn:hover {\n    background-color: rgba(0,0,0,.1);\n}\n\n.loginBox {\n    height: 32px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n\n.signBox button fa {\n    margin-right: 5px;\n}\n\n.signBox button {\n    background-color: transparent;\n    height: 32px;\n    padding-left: 15px;\n    padding-right: 15px;\n    cursor: pointer;\n    border: none;\n    outline: none;\n}\n\n#signContainer {\n    height: 32px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n\n.userInfos {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    height: 32px;\n    line-height: 32px;\n    margin-left: 10px;\n    margin-right: 10px;\n}\n.userInfos img {\n    margin-top: 5px;\n    margin-right: 5px;\n    width: 22px;\n    height: 22px;\n    border-radius: 50%;\n}\n\n#menuBtn  {\n    cursor: pointer;\n    background: transparent;\n    border: none;\n    outline: none;\n    padding: 0;\n    margin: 0;\n    width: 40px !important;\n    height: 32px !important;\n    line-height: 32px !important;\n}\n\n#menuBtn:hover {\n    background-color: darkgray;\n}\n\n.menu {\n    z-index: 60001;\n    position: absolute;\n    top: 32px;\n    right: 0;\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);\n}\n.menu button {\n    background-color: white;\n}\n.menu button fa {\n    margin-right: 5px;\n}\n\n.signBtn {\n    line-height: 0px;;\n}\n\n\n/* Online status */\n#onlineBox {\n    font-size: 0.7rem;\n    text-align: center;\n    padding: 6px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-preferred-size: row;\n        flex-basis: row;\n    z-index: 1000;\n}\n\n.onlineBtn {\n    padding: 2px;\n    border-radius: 10px;\n    width: 40px;\n    height: 16px;\n    line-height: 16px;\n}\n.green {\n    color: white;\n    background-color: green;\n}\n.red {\n    color: white;\n    background-color: red;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"loginContainer\">\n\n    <div class=\"loginBox\">\n\n\n\n\n        <!-- Online status \n        <div id=\"onlineBox\">\n        <div *ngIf=\"isOnline\" class=\"onlineBtn green\">Online</div>\n        <div *ngIf=\"!isOnline\" class=\"onlineBtn red\">Offline</div>\n        </div>\n        -->\n\n        <!-- Help button -->\n        <div class=\"helpBtnBox\">\n        <button id=\"helpBtn\" (click)=\"openHelp()\" class=\"\">\n        <fa aria-label=\"Help\" [name]=\"'question'\" [size]=\"1\"></fa>\n        </button>\n        </div>\n\n        <div id=\"signContainer\">\n            <!-- User name and thumbnail -->\n            <div *ngIf=\"user\"class=\"userInfos\">\n                <img src=\"{{ user.img }}\" alt=\"\">\n                <span>{{ user.name }}</span>\n            </div>\n\n            <!-- Login btn -->\n            <button *ngIf=\"!user\" md-button (click)=\"login()\" class=\"signBtn\">\n            <fa aria-label=\"Login\" [name]=\"'sign-in'\" [size]=\"1\"></fa>\n            <span>Login</span>\n            </button>\n            \n            <!-- Logout btn -->\n            <button *ngIf=\"user\" md-button (click)=\"logout()\">\n            <fa aria-label=\"Logout\" [name]=\"'sign-out'\" [size]=\"1\"></fa>\n            <span>Logout</span>\n            </button>\n\n\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_auth_service__ = __webpack_require__("../../../../../src/app/_core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_online_service__ = __webpack_require__("../../../../../src/app/_core/services/online.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_dialog_help_dialog_component__ = __webpack_require__("../../../../../src/app/login/help-dialog/help-dialog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services





var LoginComponent = (function () {
    function LoginComponent(dialog, _authService, _playlistService, _onlineService, _electron) {
        var _this = this;
        this.dialog = dialog;
        this._authService = _authService;
        this._playlistService = _playlistService;
        this._onlineService = _onlineService;
        this._electron = _electron;
        this.isOnline = false;
        console.log(localStorage);
        // Check internet connection
        this._onlineService.isOnline$.subscribe(function (isOnline) {
            _this.isOnline = isOnline;
        });
        // Get user info (and token)
        this._authService.user$
            .subscribe(function (user) {
            _this.user = user;
            if (user !== null) {
                _this._playlistService.fetchYoutubePlaylist();
            }
        });
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function () {
        if (this._electron.isElectronApp && this.isOnline) {
            this._authService.login();
        }
    };
    LoginComponent.prototype.logout = function () {
        if (this._electron.isElectronApp && this.isOnline && this.user) {
            this._authService.logout();
        }
    };
    LoginComponent.prototype.openHelp = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__help_dialog_help_dialog_component__["a" /* HelpDialogComponent */], {});
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MdDialog */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__core_services_playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_services_playlist_service__["a" /* PlaylistService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_services_online_service__["a" /* OnlineService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_services_online_service__["a" /* OnlineService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_electron__["a" /* ElectronService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_electron__["a" /* ElectronService */]) === "function" && _e || Object])
], LoginComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/mix-panel/mix-panel.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#mixPanelContainer {\n    height: 100%;\n}\n\n#playerContainer {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    height: 244px;\n}\n\n#playlistContainer {\n    height: calc(100% - 244px);\n}\n\n#controlBox {\n\tbackground: url(" + __webpack_require__("../../../../../src/assets/images/mix.png") + ") center no-repeat;\n\tbackground-color: #5C5B5B;\n\twidth: 100%;\n    height: 239px;\n\tmargin-left: 5px;\n\tmargin-right: 5px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.controlItem {\n    background-color: gray;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n\n/* CROSSFADER */\n#crossfader-box {\n\tmargin-top: 150px;\n\tmargin-bottom: 10px;\n\tmargin-left: auto;\n\tmargin-right: auto;\n\tpadding: 10px;\n}\n\n#tickmarks-center option {\n    font-weight: normal;\n    display: block;\n    white-space: pre;\n    min-height: 1,2em;\n    padding: 0px 2px 1px;\n    padding-top: 0px;\n    padding-right: 2px;\n    padding-bottom: 1px;\n    padding-left: 2px;\n}\n\n#crossfader-box input[type='range'] {\n    -webkit-appearance: none !important;\n    background-color:#817E7E;\n\tborder: 1px solid #C9C8C3 ;\n\tbox-shadow: inset 0px 0px 23px 0px rgba(0,0,0,0.67);\t\n    height: 15px;\n\twidth: 250px;\n\tborder-radius: 5px;\n\tmargin-top: 10px;\n\tmargin-bottom: 20px;\n}\n\n#crossfader-box input[type='range']::-webkit-slider-thumb {\n\t-webkit-appearance: none !important;\n\tbackground-color:#6C6866 ;\n\tborder-top: \t8px solid #C9C8C3 ;\n\tborder-left: \t3px solid #504F4C ;\n\tborder-right: \t3px solid #504F4C ;\n\tborder-bottom: \t8px solid #817E7E ;\n\theight: 55px;\n\twidth: 20px;\n\tborder-radius: 2px;\n\tbox-shadow: 0px 4px 10px 0px rgba(0,0,0,0.67);\n}\n\n.hori-ticks {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: horizontal;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: row;\n\t        flex-direction: row;\n\t-ms-flex-wrap: nowrap;\n\t    flex-wrap: nowrap;\n\tmargin: 0 auto;\n\tmargin-bottom: 4px;\n\twidth: 230px;\n\theight: 8px;\n\tborder-right: 1px solid #25E1DA;\n}\n\n.hori-ticks .item:nth-child(even) {\n\twidth: 10%;\n\theight: 4px;\n\tborder-left: 1px solid #25E1DA;\n}\n\n.hori-ticks .item {\n\t-ms-flex-item-align: end;\n\t    align-self: flex-end;\n\twidth: 10%;\n\theight: 8px;\n\tborder-left: 1px solid #25E1DA;\n}\n\n.megaLoader {\n\tpadding: 0;\n\tmargin: 0;\n\tz-index: 10000;\n\tposition: absolute;\n    width: calc(100% - 10px);\n    height: calc(100% - 10px);\n    background-color: red;\n}\n\n/* Playlist container */\n.doublePlaylistContainer {\n    width: 100%;\n    height: calc(100% + 30px);\n    margin: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between\n}\n\n.playlistContainer {\n\twidth: calc(50% - 5px);\n\tmargin-top: 10px;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t-ms-flex-direction: column;\n\tflex-direction: column;\n\t-ms-flex-wrap: nowrap;\n\tflex-wrap: nowrap;\n\tbox-shadow: 0px 2px 3px 3px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);\n}\n\n.marginLeft  { margin-left:  2.5px }\n.marginRight { margin-right: 2.5px }\n\n.title {\n    text-align: center;\n    height: 24px;\n    padding: 5px;\n    background-color: white;\n}\n\n.content {\n    height: 100%;\n    background-color: darkgray;\n    overflow: auto;\n}\n\n/*************************\n    PlaylistList items\n*************************/\n.plBox {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    position: relative;\n}\n\n/* Playlist privacy status */\n.plStatus {\n    z-index: 200;\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    color: darkgray;\n}\n\n/* Playlist content */\n.plContent {\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-line-pack: distribute;\n        align-content: space-around\n}\n\n/* Background icon */\n.iconBg {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    color: white;\n    opacity: 0.2;\n    z-index: 5;\n    top: 20px;\n    left: calc(1vw + 20%);\n    right: calc(1vw + 20%);\n}\n.thumbBg {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    color: white;\n    opacity: 0.4;\n    z-index: 5;\n    text-align: center;\n}\n.thumbBg img {\n    height: 100%;\n}\n\n/* Content text */\n.plContentInfos {\n    color: white;\n    z-index: 6;\n    margin: 10px 10px 10px 20px;\n    width: calc(100% - 30px);\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.plName { font-size: 1.2rem; font-weight: bold; }\n.plDesc { font-size: 0.8rem; }\n.nbrVideo { font-size: 0.8rem; opacity: 0.8;}\n\n/* Playlist footer */\n.plFooter {\n    width: 100%;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    background-color: rgba(255, 255, 255, 0.1);\n}\n\n/* playlist control */\n.plBtn {\n    cursor: pointer;\n    width: 34px !important;\n    height: 34px;\n    border: none;\n    background-color: transparent;\n    color: white;\n}\n.playBtn:hover { color: #48b735 }\n.editBtn:hover { color: #248fd6 }\n.deleteBtn:hover { color: #e83e3e }\n.spacerBtn { width: 100px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/mix-panel/mix-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<!--div class=\"megaLoader\"><fa [name]=\"'spinner'\" [size]=\"5\"></fa></div-->\n\n<div id=\"mixPanelContainer\">\n\n    <div id=\"playerContainer\">\n        <app-video-player #left [video]=\"videoLeft\" [sidePlayer]=\"'left'\" (nearEnd)=\"triggerMixLTR($event)\"\n        [volume]=\"volLeft\" [speed]=\"speedLeft\" (volumeChange)=\"volLeft\" (speedChange)=\"speedLeft\"></app-video-player>\n        \n        <div id=\"controlBox\">\n            <!-- Crossfader -->\n            <div id=\"crossfader-box\" class=\"line-border\">\n                <div class=\"hori-ticks\">\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                    <div class=\"item\"></div>\n                </div>\n                <input value=\"{{ crossfaderValue }}\" [(ngModel)]=\"crossfaderValue\" (ngModelChange)=\"setCrossFaderValue($event)\" \n                class=\"crossfader horizontal\" type=\"range\"  min=\"0\" max=\"100\" step=\"0.5\" list=\"tickmarks-center\">\n            </div>\n        </div>\n        \n        <app-video-player #right [video]=\"videoRight\" [sidePlayer]=\"'right'\" (nearEnd)=\"triggerMixRTL($event)\"\n        [volume]=\"volRight\" [speed]=\"speedRight\" (volumeChange)=\"volRight\" (speedChange)=\"speedRight\"></app-video-player>\n    </div>\n\n    <!-- On play playlist and search playlist -->\n    <div id=\"playlistContainer\">\n        <app-edit-playlist [playlist]=\"onPlayPlaylist\"  [type]=\"'player'\"></app-edit-playlist>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/mix-panel/mix-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MixPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_player_service__ = __webpack_require__("../../../../../src/app/_core/services/player.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MixPanelComponent = (function () {
    function MixPanelComponent(_playerService, _playlistService, _electronService) {
        var _this = this;
        this._playerService = _playerService;
        this._playlistService = _playlistService;
        this._electronService = _electronService;
        this.title = 'TurnTable';
        // Timer
        this.timerControl$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.playList = [];
        // Get current player left
        this._playerService.playerLeft$.subscribe(function (vl) {
            _this.videoLeft = vl;
        });
        // Get current player right
        this._playerService.playerRight$.subscribe(function (vr) {
            _this.videoRight = vr;
        });
        // Get on lay playlist
        this._playlistService.onPlayPlaylist$.subscribe(function (pl) {
            _this.onPlayPlaylist = pl;
        });
        // Init crossfader value
        this.crossFaderValue = 50;
    }
    MixPanelComponent.prototype.setCrossFaderValue = function (value) {
        console.log(value);
        /*
                const valLeft;
                const valRight;
                if (value < 50) {
                    value / 100 *
                    valLeft  =
                    valRight =
        
                } else if (value >= 50) {
                    valLeft  =
                    valRight =
                }
                */
    };
    // Manage mix
    MixPanelComponent.prototype.triggerMixLTR = function (event) {
        console.log('Trigger mix left to right');
        this.currVolLeft = event;
        if (this.videoRight) {
            this.playerRight.playPauseVideo();
            this._playerService.setActivePlayer('right');
            this.initTimerLTR(event);
        }
        else if (this.onPlayPlaylist && this.onPlayPlaylist.videolist.length > 0) {
            var videoToPlay = this.onPlayPlaylist.videolist[0];
            this._playerService.setPlayerRight(videoToPlay);
            this.videoRight = videoToPlay;
            // this.playerRight.playPauseVideo();
            this._playerService.setActivePlayer('right');
            this.initTimerLTR(event);
        }
    };
    // Init Timer
    MixPanelComponent.prototype.initTimerLTR = function (volume) {
        var _this = this;
        this.timerControl$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.timer$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(15000, 1000);
        this.sub = this.timer$.subscribe(function (t) {
            _this.volLeft = _this.currVolLeft - 2;
            _this.currVolLeft = _this.volLeft;
            console.log('============================');
            console.log('PlayerLeft state', _this.playerLeft.getPlayerState());
            console.log('LTR => ' + _this.currVolLeft);
            if (_this.playerLeft.getPlayerState() === 5
                || _this.playerLeft.getPlayerState() === 2
                || _this.playerLeft.getPlayerState() === 0
                || _this.playerLeft.getPlayerState() === 1
                || _this.playerLeft.getPlayerState() === -1) {
                console.log('=> Stop timer LTR');
                _this.stopTimer();
            }
        });
        // console.log('RTL => ' + this.currVolLeft);
    };
    MixPanelComponent.prototype.triggerMixRTL = function (event) {
        console.log('Trigger mix right to left');
        this.currVolRight = event;
        if (this.videoLeft) {
            this.playerLeft.playPauseVideo();
            this._playerService.setActivePlayer('left');
            this.initTimerRTL(event);
        }
        else if (this.onPlayPlaylist && this.onPlayPlaylist.videolist.length > 0) {
            var videoToPlay = this.onPlayPlaylist.videolist[0];
            this._playerService.setPlayerLeft(videoToPlay);
            this.videoLeft = videoToPlay;
            // this.playerLeft.playPauseVideo();
            this._playerService.setActivePlayer('left');
            this.initTimerRTL(event);
        }
    };
    // Init Timer
    MixPanelComponent.prototype.initTimerRTL = function (volume) {
        var _this = this;
        this.timerControl$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.timer$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(15000, 1000);
        this.sub = this.timer$.subscribe(function (t) {
            _this.volRight = _this.currVolRight - 2;
            _this.currVolRight = _this.volRight;
            console.log('============================');
            console.log('PlayerLeft state', _this.playerRight.getPlayerState());
            console.log('LTR => ' + _this.currVolRight);
            if (_this.playerRight.getPlayerState() === 5
                || _this.playerRight.getPlayerState() === 2
                || _this.playerRight.getPlayerState() === 1
                || _this.playerRight.getPlayerState() === 0
                || _this.playerRight.getPlayerState() === -1) {
                console.log('Stop timer RTL');
                _this.stopTimer();
            }
            // console.log('RTL => ' + this.currVolRight);
        });
    };
    // Stop timer
    MixPanelComponent.prototype.stopTimer = function () {
        // console.log('Stop Timer');
        this.timerControl$.next();
        if (this.sub) {
            this.sub.unsubscribe();
        }
        //  this.initTimer();
        this.timer$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].empty();
    };
    return MixPanelComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('left'),
    __metadata("design:type", Object)
], MixPanelComponent.prototype, "playerLeft", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('right'),
    __metadata("design:type", Object)
], MixPanelComponent.prototype, "playerRight", void 0);
MixPanelComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-mix-panel',
        template: __webpack_require__("../../../../../src/app/mix-panel/mix-panel.component.html"),
        styles: [__webpack_require__("../../../../../src/app/mix-panel/mix-panel.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__core_services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_services_player_service__["a" /* PlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_services_playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_services_playlist_service__["a" /* PlaylistService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_electron__["a" /* ElectronService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_electron__["a" /* ElectronService */]) === "function" && _c || Object])
], MixPanelComponent);

var _a, _b, _c;
//# sourceMappingURL=mix-panel.component.js.map

/***/ }),

/***/ "../../../../../src/app/playlist-panel/create-playlist-dialog/create-playlist-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <h2 md-dialog-title>Create new playlist</h2>\n    <md-dialog-content>\n\n        <!-- Playlist name -->\n        <form class=\"example-form\">\n        <md-form-field class=\"example-full-width\">\n        <input mdInput type=\"text\" [(ngModel)]=\"name\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Playlist name\">\n        </md-form-field>\n        </form>\n        \n        <!-- Playlist privacy status -->\n        <label class=\"labelVisible\">Playlist visibility:</label>\n        <md-radio-group class=\"radioBtnGrp\" [(ngModel)]=\"privacyStatus\">\n        <md-radio-button class=\"radioBtn\" value=\"public\">Public</md-radio-button>\n        <md-radio-button class=\"radioBtn\" value=\"private\">Private</md-radio-button>\n        </md-radio-group>\n    </md-dialog-content>\n\n    <!-- Controls -->\n    <md-dialog-actions>\n        <button md-button (click)=\"onCancel()\">cancel</button>\n        <button md-button (click)=\"onAccept()\">Ok</button>\n    </md-dialog-actions>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/playlist-panel/create-playlist-dialog/create-playlist-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePlaylistDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var CreatePlaylistDialogComponent = (function () {
    function CreatePlaylistDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.name = '';
        this.privacyStatus = 'public';
    }
    CreatePlaylistDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    CreatePlaylistDialogComponent.prototype.onAccept = function () {
        if (this.name !== '' && this.privacyStatus !== '') {
            this.dialogRef.close({
                name: this.name,
                privacyStatus: this.privacyStatus
            });
        }
    };
    return CreatePlaylistDialogComponent;
}());
CreatePlaylistDialogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-playlist-dialog',
        template: __webpack_require__("../../../../../src/app/playlist-panel/create-playlist-dialog/create-playlist-dialog.component.html"),
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdDialogRef */]) === "function" && _a || Object, Object])
], CreatePlaylistDialogComponent);

var _a;
//# sourceMappingURL=create-playlist-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/playlist-panel/playlist-panel.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.progressBarGray {\n    position: absolute;\n    background-color: rgba(0,0,0,.5);\n    /*height: calc(100% - 64px);*/\n    width: 100%;\n    z-index: 99998;\n}\n\n/*************************\n         Toolbar\n*************************/\n.toolBar {\n    z-index: 1000;\n    width: calc(100% - 10px);\n    position: fixed;\n    height: 64px;\n    box-shadow: 0 3px 1px -9px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);\n}\n\n.plPanelContent {\n\tmargin-top: 64px;\n\toverflow: auto;\n    height: calc(100% - 69px);\n}\n.plPanelContent md-grid-list { margin: 0 !important; }\n.plPanelContent md-grid-tile { background: #242320; }\n\n.button-row {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n\n.spacerToolbar { -webkit-box-flex: 1; -ms-flex: 1 1 auto; flex: 1 1 auto; }\n\n.inputSearchPlaylist {\n    border: none;\n    border-radius: 20px;\n    padding-left: 18px;\n    padding-right: 18px;\n    margin-left :16px;\n    line-height: 36px;\n    font-size: 14px;\n    font-weight: 500;\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);\n}\n\n.inputFilterbox {\n    position: relative;\n}\n\n#clearInputFilter {\n    cursor: pointer;\n    color: white;\n\tposition: absolute;\n\tmargin-left: -35px;\n    top: 5.5px;\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    border: none;\n    outline: none;\n    background-color: gray;\n}\n\n.returnBtn {\n    padding-left: 4px !important;\n    margin-right: 10px !important;\n    padding-right: 0 !important;\n    width: 40px !important;\n    min-width: 20px !important;\n    text-align: center;\n}\n\n/*************************\n    PlaylistList items\n*************************/\n.playlistGrid {\n    /*margin-top: 5px;*/\n}\n.playlistSpacer {\n    height: 5px;\n}\n\n.plBox {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    position: relative;\n}\n\n/* Playlist privacy status */\n.plStatus {\n    z-index: 200;\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    color: darkgray;\n}\n\n/* Playlist content */\n.plContent {\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-line-pack: distribute;\n        align-content: space-around\n}\n\n/* Background icon */\n.iconBg {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    color: white;\n    opacity: 0.2;\n    z-index: 5;\n    top: 20px;\n    left: calc(1vw + 20%);\n    right: calc(1vw + 20%);\n}\n.thumbBg {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    color: white;\n    opacity: 0.4;\n    z-index: 5;\n    text-align: center;\n}\n.thumbBg img {\n    height: 100%;\n}\n\n/* Content text */\n.plContentInfos {\n    color: white;\n    z-index: 6;\n    margin: 10px 10px 10px 20px;\n    width: calc(100% - 30px);\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.plName { font-size: 1.2rem; font-weight: bold; }\n.plDesc { font-size: 0.8rem; }\n.nbrVideo { font-size: 0.8rem; opacity: 0.8;}\n\n/* Playlist footer */\n.plFooter {\n    width: 100%;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    background-color: rgba(255, 255, 255, 0.1);\n}\n\n/* playlist control */\n.plBtn {\n    cursor: pointer;\n    width: 34px !important;\n    height: 34px;\n    border: none;\n    background-color: transparent;\n    color: white;\n}\n/*\n.playBtn:hover { color: #48b735 }\n.editBtn:hover { color: #248fd6 }\n.deleteBtn:hover { color: #e83e3e }\n*/\n.spacerBtn { width: 100px; }\n\n.plPanelContent md-grid-tile:hover .playBtn { color: #48b735 }\n.plPanelContent md-grid-tile:hover .editBtn { color: #248fd6 }\n.plPanelContent md-grid-tile:hover .deleteBtn { color: #e83e3e }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/playlist-panel/playlist-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Playlist list mode toolbar -->\n<div class=\"toolBar\">\n    <md-toolbar *ngIf=\"!isEditMode\">\n\n        <!-- Create playlist button -->\n        <button class=\"toolbarBtn\" md-raised-button (click)=\"createPlaylist()\">\n            <fa aria-label=\"Create playlist\" [name]=\"'plus'\" [size]=\"1\"></fa>\n            Create playlist\n        </button>\n\n        <!-- Search/filter playlist by word -->\n        <span class=\"inputFilterbox\">\n            <input id=\"inputFilter\" mdInput [formControl]=\"filterPlaylist\" [mdAutocomplete]=\"auto\"\n                class=\"inputSearchPlaylist\" type=\"text\"  placeholder=\"Filter playlists...\">\n            \n            <button *ngIf=\"filterPlaylist.value && filterPlaylist.value.length > 0\"\n                (click)=\"filterPlaylist.setValue('')\" id=\"clearInputFilter\" >X</button>\n\n            <md-autocomplete #auto=\"mdAutocomplete\" class=\"autocompleteBox\">\n                <md-option *ngFor=\"let pl of playlistsList\" [value]=\"pl.title\">\n                {{ pl.title }}\n                </md-option>\n            </md-autocomplete>\n        </span>\n        \n        <!-- Toolbar space -->\n        <span class=\"spacerToolbar\"></span>\n\n        <!-- Playlist count -->\n        <span style=\"margin-left :16px; margin-right :16px;\">{{ playlistsList.length }} Playlist<span *ngIf=\"playlistsList.length > 1\">s</span></span>\n\n        <!-- Refresh playlist list button -->\n        <button class=\"toolbarBtn\" *ngIf=\"!isEditMode && isLoggedIn\" md-raised-button (click)=\"reloadPlaylist()\">\n        <fa aria-label=\"Refresh playlist\" [name]=\"'refresh'\" [size]=\"1\"></fa>\n        Reload from Youtube\n        </button>\n    </md-toolbar>\n\n\n    <!-- Edit playlist mode toolbar -->\n    <md-toolbar *ngIf=\"isEditMode\" class=\"toolBar\">\n\n        <!-- Return button -->\n        <button class=\"toolbarBtn returnBtn\"  md-raised-button (click)=\"return()\">\n            <fa aria-label=\"Return\" [name]=\"'arrow-left'\" [size]=\"1\"></fa>\n        </button>\n\n        <!-- Save playlist button -->\n        <button class=\"toolbarBtn\"  md-raised-button (click)=\"saveOnEditPlaylist()\">\n            <fa aria-label=\"Save playlist\" [name]=\"'floppy-o'\" [size]=\"1\"></fa>\n            Save playlist\n        </button>\n        <span class=\"spacerToolbar\"></span>\n    </md-toolbar>\n</div>\n\n\n<div class=\"playlistSpacer\"></div>\n\n<!-- List of playlist -->\n<div *ngIf=\"!isEditMode\" class=\"plPanelContent\">\n    \n    <div class=\"playlistGrid\">\n\n        <!-- Progress bar -->\n        <div class=\"progressBarGray\" *ngIf=\"isProgressBar\"></div>\n        <md-progress-bar\n            *ngIf=\"isProgressBar\"\n            [color]=\"primary\"\n            [mode]=\"determinate\"\n            [value]=\"progressBarValue\">\n        </md-progress-bar>\n\n        <md-grid-list  *ngIf=\"playlistsList\" cols=\"4\" rowHeight=\"160px\" gutterSize=\"25px\" >\n\n            <!-- Playlist list items -->\n            <md-grid-tile *ngFor=\"let pl of playlistsList | filterPlaylist:filterPlaylist.value ; let i = index\">\n                <div class=\"plBox\">\n\n                    <!-- Privacy status playlist icons -->\n                    <div *ngIf=\"pl.privacyStatus === 'private'\" mdTooltip=\"Playlist private\" [mdTooltipPosition]=\"'below'\" class=\"plStatus private\">\n                    <fa aria-label=\"Playlist private\" [name]=\"'lock'\" [size]=\"1\"></fa>\n                    </div>\n\n                    <div *ngIf=\"pl.privacyStatus === 'public'\" mdTooltip=\"Playlist public\" [mdTooltipPosition]=\"'below'\" class=\"plStatus public\">\n                    <fa aria-label=\"Playlist public\" [name]=\"'globe'\" [size]=\"1\"></fa>\n                    </div>\n\n                    <div class=\"plContent\">\n                        <div *ngIf=\"pl.thumbUrl === ''\" class=\"iconBg\"><fa [name]=\"'music'\" [size]=\"5\"></fa></div>\n                        <div *ngIf=\"pl.thumbUrl !== ''\" class=\"thumbBg\">\n                            <img src=\"{{ pl.thumbUrl }}\" alt=\"\">\n                        </div>\n\n                        <div class=\"plContentInfos\">\n                            <p class=\"plName\">{{ pl.title }}</p>\n                            <p class=\"plDesc\">{{ pl.description }}</p>\n                            <p class=\"nbrVideo\">{{ pl.videolist.length }} video<span *ngIf=\"pl.videolist.length > 1\">s</span></p>\n                        </div>\n                    </div>\n\n                    <div class=\"plFooter\">\n                        <!-- Play playlist button -->\n                        <button  class=\"playBtn plBtn\" (click)=\"playPlaylist(pl)\" mdTooltip=\"Play playlist!\" [mdTooltipPosition]=\"'above'\">\n                        <fa aria-label=\"Edit playlist\" [name]=\"'play'\" [size]=\"2\"></fa>\n                        </button>\n\n                        <div class=\"spacerBtn\"></div>\n                        \n                        <!-- Edit playlist button -->\n                        <button class=\"editBtn plBtn\" (click)=\"editPlaylist(pl)\" mdTooltip=\"Edit playlist!\" [mdTooltipPosition]=\"'above'\">\n                        <fa aria-label=\"Edit playlist\" [name]=\"'pencil'\" [size]=\"2\"></fa>\n                        </button>\n\n                        <!-- Remove playlist button -->\n                        <button class=\"deleteBtn plBtn\" (click)=\"deletePlaylist(pl)\" mdTooltip=\"Delete playlist!\" [mdTooltipPosition]=\"'above'\">\n                        <fa aria-label=\"Delete playlist\" [name]=\"'trash'\" [size]=\"2\"></fa>\n                        </button>\n                    </div>\n                </div>\n\n            </md-grid-tile>\n        </md-grid-list>\n    </div>\n</div>\n\n<!-- Edit playlist -->\n<div *ngIf=\"isEditMode\" class=\"plPanelContent\" >\n    <app-edit-playlist [playlist]=\"onEditPlaylist\" [type]=\"'edit'\"></app-edit-playlist>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/playlist-panel/playlist-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__("../../../../angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/add/operator/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_models_playlist_model__ = __webpack_require__("../../../../../src/app/_shared/models/playlist.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_services_playlist_service__ = __webpack_require__("../../../../../src/app/_core/services/playlist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_utils_service__ = __webpack_require__("../../../../../src/app/_core/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__create_playlist_dialog_create_playlist_dialog_component__ = __webpack_require__("../../../../../src/app/playlist-panel/create-playlist-dialog/create-playlist-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_components_confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/_shared/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__core_services_tabs_service__ = __webpack_require__("../../../../../src/app/_core/services/tabs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__core_services_auth_service__ = __webpack_require__("../../../../../src/app/_core/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var testPlaylist = {
    id: 'a55f086e-82e7-8e8b-f0e2-bfef59cf5cf1',
    title: 'Test playlist',
    description: '',
    thumbUrl: '',
    thumbH: null,
    thumbW: null,
    publishedAt: '',
    privacyStatus: 'public',
    isLocal: true,
    videolist: [
        {
            id: '-Cvo2fVb1aY',
            title: 'Midnight Magic - Vicious Love (Offi…',
            description: 'The official video for Vicious Lov…',
            thumbUrl: 'https://i.ytimg.com/vi/-Cvo2fVb1aY/…',
            duration: 268000
        },
        {
            id: 'MceYFMDL108',
            title: 'Midnight Magic - Drop Me A Line (Of…',
            description: 'by Pilar Wiley',
            thumbUrl: 'https://i.ytimg.com/vi/MceYFMDL108/…',
            duration: 235000
        },
        {
            id: '29uVBx9cyrs',
            title: 'Midnight Magic - I Gotta Feeling',
            description: 'Stream / Download:  https: //midnight…',
            thumbUrl: 'https://i.ytimg.com/vi/29uVBx9cyrs/…',
            duration: 346000
        },
        {
            id: '8EaYwmv7hcA',
            title: 'Midnight Magic - Beam Me Up',
            description: 'Midnight Magics official music vid…',
            thumbUrl: 'https://i.ytimg.com/vi/8EaYwmv7hcA/…',
            duration: 235000
        }
    ]
};
var PlaylistPanelComponent = (function () {
    function PlaylistPanelComponent(utils, dialog, _authService, _playlistService, _tabsService) {
        var _this = this;
        this.utils = utils;
        this.dialog = dialog;
        this._authService = _authService;
        this._playlistService = _playlistService;
        this._tabsService = _tabsService;
        this.playlistsList = [];
        this.isEditMode = false;
        this.isLoggedIn = false;
        // Check if user is logged in
        this._authService.user$
            .subscribe(function (user) {
            _this.isLoggedIn = user ? true : false;
        });
        // Init loading playlist progress bar
        this.isProgressBar = false;
        // Get progress bar value
        this._playlistService.progressBarValue$
            .subscribe(function (pbv) {
            _this.progressBarValue = pbv;
            if (!pbv || pbv === 0 || pbv === 100) {
                _this.isProgressBar = false;
            }
            else {
                _this.isProgressBar = true;
            }
            if (pbv === 99) {
                _this._playlistService.setProgressBarValue(100);
            }
        });
        // Get selected tab
        this._tabsService.selectedTab$
            .subscribe(function (st) {
            _this.selectedTab = st;
        });
        // Fake data
        /*
        const arr = [];
        for (let i = 0; i < 25; i++) {
            arr.push(testPlaylist);
        }
        this.playlistsList = <Playlist[]>arr;
        */
        // this.playlistsList = <Playlist[]>[testPlaylist];
        // Get playlist list
        this._playlistService.playListsList$
            .subscribe(function (pl) {
            _this.playlistsList = pl;
            _this.updateFilterInput();
        });
        // Get on edit playlist
        this._playlistService.onEditPlaylist$
            .subscribe(function (pl) {
            _this.onEditPlaylist = pl;
        });
        // Init filter playlist input
        this.filterPlaylist = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]();
        this.filterPlaylist.disable();
        this.filteredStates = this.filterPlaylist.valueChanges
            .startWith(null)
            .map(function (title) { return title ? _this.filterPlaylists(title) : _this.playlistsList.slice(); });
        this.updateFilterInput();
    }
    // Update disabled/enabled status of filter playlist
    PlaylistPanelComponent.prototype.updateFilterInput = function () {
        if (this.playlistsList.length > 1) {
            this.filterPlaylist.enable();
            this.filterPlaylist.setValue('');
        }
        else if (this.playlistsList.length < 2) {
            this.filterPlaylist.disable();
        }
        return false;
    };
    PlaylistPanelComponent.prototype.ngOnInit = function () {
    };
    // Create new playlist
    PlaylistPanelComponent.prototype.createPlaylist = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__create_playlist_dialog_create_playlist_dialog_component__["a" /* CreatePlaylistDialogComponent */], {});
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var id = __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID();
                var title = result.name;
                var privacyStatus = result.privacyStatus;
                var videoList = new Array();
                var pl = new __WEBPACK_IMPORTED_MODULE_6__shared_models_playlist_model__["a" /* Playlist */](id, title, '', '', 0, 0, '', privacyStatus, true, videoList);
                _this.playlistsList.push(pl);
                _this._playlistService.setPlayListsList(_this.playlistsList);
            }
        });
    };
    // Edit the selected playlist
    PlaylistPanelComponent.prototype.editPlaylist = function (playlist) {
        this.isEditMode = true;
        var pl = this.utils.copyPlaylist(playlist);
        this._playlistService.setOnEditPlayList(pl);
        this.originalOnEditPlaylist = this.utils.copyPlaylist(pl);
    };
    // Save the on edit playlist
    PlaylistPanelComponent.prototype.saveOnEditPlaylist = function () {
        var pl = this.utils.copyPlaylist(this.onEditPlaylist);
        var pll = this.playlistsList;
        pll.forEach(function (el, i) {
            if (el.id === pl.id) {
                pll.splice(i, 1, pl);
            }
        });
        this.isEditMode = false;
        this._playlistService.setPlayListsList(pll);
        this._playlistService.setOnEditPlayList(null);
        this._playlistService.setSearchResultPlaylist(null);
    };
    // Return button (cancel modification)
    PlaylistPanelComponent.prototype.return = function () {
        var _this = this;
        // Check if onEditPlaylist is modified
        var isPlaylistModified = !this.utils.isVideolistEqual(this.onEditPlaylist.videolist, this.originalOnEditPlaylist.videolist);
        if (isPlaylistModified) {
            var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__shared_components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */], {
                data: { title: 'Cancel modification?' }
            });
            dialogRef.afterClosed().subscribe(function (isDelete) {
                if (isDelete) {
                    _this.isEditMode = false;
                    _this._playlistService.setOnEditPlayList(null);
                    _this._playlistService.setSearchResultPlaylist(null);
                }
            });
        }
        else {
            this.isEditMode = false;
            this._playlistService.setOnEditPlayList(null);
            this._playlistService.setSearchResultPlaylist(null);
        }
    };
    // Play the selected playlist
    PlaylistPanelComponent.prototype.playPlaylist = function (playlist) {
        // if (playlist.videolist.length > 0) {
        var pl = this.utils.copyPlaylist(playlist);
        this._playlistService.setOnPlayPlayList(pl);
        this._tabsService.setSelectedTab(2);
        // }
    };
    // Delete the selected playlist
    PlaylistPanelComponent.prototype.deletePlaylist = function (playlist) {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__shared_components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */], {
            data: { title: 'Delete playlist \'' + playlist.title + '\'?' }
        });
        dialogRef.afterClosed().subscribe(function (isDelete) {
            if (isDelete && playlist) {
                var updatedPlaylistsList = _this.playlistsList.filter(function (pl) {
                    return pl.id !== playlist.id;
                });
                _this._playlistService.setPlayListsList(updatedPlaylistsList);
            }
        });
    };
    // Filter playlist by title
    PlaylistPanelComponent.prototype.filterPlaylists = function (title) {
        return this.playlistsList.filter(function (playlist) {
            return playlist.title.toLowerCase().indexOf(title.toLowerCase()) === 0;
        });
    };
    // Reload playlist from youtube
    PlaylistPanelComponent.prototype.reloadPlaylist = function () {
        this._playlistService.fetchYoutubePlaylist();
    };
    return PlaylistPanelComponent;
}());
PlaylistPanelComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-playlist-panel',
        template: __webpack_require__("../../../../../src/app/playlist-panel/playlist-panel.component.html"),
        styles: [__webpack_require__("../../../../../src/app/playlist-panel/playlist-panel.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__core_services_utils_service__["a" /* UtilsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__core_services_utils_service__["a" /* UtilsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MdDialog */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_12__core_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__core_services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__core_services_playlist_service__["a" /* PlaylistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_services_playlist_service__["a" /* PlaylistService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_11__core_services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__core_services_tabs_service__["a" /* TabsService */]) === "function" && _e || Object])
], PlaylistPanelComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=playlist-panel.component.js.map

/***/ }),

/***/ "../../../../../src/app/settings-panel/settings-panel.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".settingsContainer {\n    margin: 0 auto;\n    margin-top: 50px;\n    padding: 20px;\n    width: 500px;\n    height: 300px;\n    background-color: white;\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);\n}\n\n.settingGeneral {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/settings-panel/settings-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"settingsContainer\">\n    <form>\n\n    <fieldset class=\"settingGeneral\">\n        <legend>General</legend>\n        Work in progress...\n\n        <md-select placeholder=\"Langage\" [(ngModel)]=\"selectedLangage\" name=\"food\" disabled>\n        <md-option *ngFor=\"let langage of langagesList\" [value]=\"langage.value\">\n        {{langage.viewValue}}\n        </md-option>\n        </md-select>\n\n        <md-select placeholder=\"Theme\" [(ngModel)]=\"selectedTheme\" name=\"food\" disabled>\n        <md-option *ngFor=\"let theme of themesList\" [value]=\"theme\">\n        {{theme}}\n        </md-option>\n        </md-select>\n    </fieldset>\n\n    <fieldset>\n        <legend>Export playlists</legend>\n         Work in progress...\n        <button class=\"toolbarBtn\" md-raised-button disabled>\n        <fa aria-label=\"Export playlists\" [name]=\"'external-link'\" [size]=\"2\"></fa>\n        Export\n        </button>\n    </fieldset>\n\n    </form> \n</div>"

/***/ }),

/***/ "../../../../../src/app/settings-panel/settings-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsPanelComponent = (function () {
    function SettingsPanelComponent() {
        this.langagesList = [
            { value: 'en', viewValue: 'English' },
            { value: 'fr', viewValue: 'Français' }
        ];
        this.themesList = [
            'dark',
            'light'
        ];
    }
    SettingsPanelComponent.prototype.ngOnInit = function () {
    };
    return SettingsPanelComponent;
}());
SettingsPanelComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-settings-panel',
        template: __webpack_require__("../../../../../src/app/settings-panel/settings-panel.component.html"),
        styles: [__webpack_require__("../../../../../src/app/settings-panel/settings-panel.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SettingsPanelComponent);

//# sourceMappingURL=settings-panel.component.js.map

/***/ }),

/***/ "../../../../../src/assets/images/mix.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "mix.a693216c82392dde9d78.png";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map