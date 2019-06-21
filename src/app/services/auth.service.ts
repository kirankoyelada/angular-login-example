import { Injectable } from '@angular/core';
import {UserManager,User, WebStorageStateStore} from 'oidc-client';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _userManager:UserManager;
    private _user:User;
    constructor() { 
        var config={
            authority:'https://securingangularappscourse-sts.azurewebsites.net/',
            client_id:'spa-client',
            redirect_uri:'http://localhost:4200/assets/oidc-login-redirect.html',
            scope:'openid projects-api profile',
            response_type:'id_token token',
            post_logout_redirect_url:'http://localhost:4200/?postLogout=true',
            userStore:new WebStorageStateStore({store:window.localStorage}),
            automaticSilentRenew:true
        };
        this._userManager=new UserManager(config);
        this._userManager.getUser().then(user=>{
            if( user && !user.expired){
                this._user=user;
                console.log(this._user);
            }
        });
    }
    login():Promise<any>{
        console.log('auth service login method');
        return this._userManager.signinRedirect();
    }

    logout(){
        this._userManager.signoutRedirect();
    }

    isLoggedIn():boolean{
        return this._user && this._user.access_token && !this._user.expired
    }

    getAccessToken():string{
        return this._user.access_token;
    }
    signoutRedirectCallback():Promise<any>{
        return this._userManager.signoutRedirectCallback();
    }
}