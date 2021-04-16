import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { ProjectService } from 'src/app/services_strapi/project.service';

@Component({
  selector: 'app-previous-next',
  templateUrl: './previous-next.component.html',
  styleUrls: ['./previous-next.component.scss']
})
export class PreviousNextComponent implements OnInit {

  unit_type : any;
  previous_project : any;
  next_project : any;

  constructor(
    // private projectSvc: ProjectService,
    // private route: ActivatedRoute,
    // private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    console.log("previous - next : ");
    
    // this.route.params.subscribe( p => {
      // this.projectTitle = p['title'];
      // this.projectSvc.getAllProjects().subscribe((allProjects:any[]) => {
        // for (let i=0; i<allProjects.length; i++) {
        //   let project = allProjects[i];
        //   if (this.helperService.encodeCustomURI(project.title) == this.projectTitle) {
        //     this.project = project;

        //     this.folder_name = this.project.GPT_folder_name;
        //     // if(this.folder_name){
        //     //   this.single_project_load_gpt_images(this.folder_name)
        //     // }
        //     let current_project = this.project.id;
        //     this.previous_project = this.previous_project + current_project;
        //     this.next_project = this.next_project + current_project;

        //     console.log("current project: " + current_project );
        //     console.log("previous project: " + this.previous_project );
        //     console.log("next project: " + this.next_project );
        //     // console.log("amount of projects: " + allProjectsCachedObservable.length);


        //     return console.log("project data array: " + this.project );
        //   }
        // }
    //   });
    // });
  }

}
