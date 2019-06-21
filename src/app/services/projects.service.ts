import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProjectService {
    projects:Observable<any>;
    constructor(private httpClient: HttpClient,private authService:AuthService) { }
    getProjects():Observable<any>{
        // let accessToken=this.authService.getAccessToken();
        // var header=new HttpHeaders().set('Authorization',`Bearer ${accessToken}`);
        return this.httpClient.get<any>('https://securingangularappscourse-api.azurewebsites.net/api/Projects');
    }
}