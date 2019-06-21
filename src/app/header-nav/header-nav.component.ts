import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/projects.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  isLoading:boolean=false;
  project:Observable<any>;
  constructor(private authService:AuthService,private router:Router,private projectService:ProjectService) { }

  ngOnInit() {
    console.log(window.location.href);
    if(window.location.href.indexOf('?postLogout=true')>0){
      this.authService.signoutRedirectCallback().then(x=>{
        let url:string=this.router.url.substring(0,this.router.url.indexOf('?'));
        console.log("url"+url);
        this.router.navigateByUrl(url);
      });
    }
  }
  login(){
    console.log('app component');
    this.authService.login();
    console.log("this.authService.isLoggedIn()"+this.authService.isLoggedIn());
  }
  logout(){
    this.authService.logout();
  }

  getToken(){
    console.log(this.authService.getAccessToken());
  }
  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }

}
