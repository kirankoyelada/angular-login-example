import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/projects.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  project:Observable<any>;
  constructor(private authService:AuthService,private projectService:ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }
  getProjects(){
    if(this.authService.isLoggedIn){
      this.projectService.getProjects().subscribe(x=>this.project=x);
    }
  }
}
