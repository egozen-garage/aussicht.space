import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services_strapi/project.service';
import { ActivatedRoute } from '@angular/router';

//import { CustomDesignIframeComponent } from '../custom_designs/custom-design-iframe/custom-design-iframe.component';
//import { CustomDesignJavascriptComponent } from '../custom_designs/custom-design-javascript/custom-design-javascript.component';

// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectID : string = "";
  project:any;
  constructor(
    private projectSvc: ProjectService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    // this.projectSvc.getAllProjects().subscribe((res:any) => {
    //   this.projects = res;
    // });

    this.route.params.subscribe( p => this.projectID = p['id'] );

    // this.project$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     const name = params.get('id');
    //     console.log("id name is:" + name);
    //     return this.projectSvc.getProject(name);
    //   })
    // );

    this.projectSvc.getProject(this.projectID).subscribe((res:any) => {
      this.project = res;
      return console.log("project data array: " + this.project );
    });
  }

}
