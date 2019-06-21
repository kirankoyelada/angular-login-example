import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {Router} from '@angular/router';
import { ProjectService } from './services/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    console.log(window.location.href);
   if(window.location.href.indexOf('?postLogout=true')>0){
     this.authService.signoutRedirectCallback().then(x=>{
       let url:string=this.router.url.substring(0,this.router.url.indexOf('?'));
       console.log("url"+url);
       this.router.navigateByUrl(url);
     });
   }   
  }
  title = 'test-login-app';
  constructor(private authService:AuthService,private router:Router,private projectService:ProjectService){

  }
  login(){
    console.log('app component');
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

  getToken(){
    console.log(this.authService.getAccessToken());
  }
  isLogged():boolean{
    return this.authService.isLoggedIn();
  }
}