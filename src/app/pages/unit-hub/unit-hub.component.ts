import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services_strapi/project.service';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-hub',
  templateUrl: './unit-hub.component.html',
  styleUrls: ['./unit-hub.component.scss']
})
export class UnitHubComponent implements OnInit {


  projects: any = [];
  perspectives: any = [];
  units:any;
  constructor(
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    public route: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.projectSvc.getAllProjects().subscribe((res:any) => {
      this.projects = res;
    });
    this.perspectiveSvc.getAllPerspectives().subscribe((res:any) => {
      this.perspectives = res;
      this.units = [ ...this.projects, ...res];
      this.units = this.shuffle(this.units);
      console.log("units are: " + this.units);
      
    });
  }

  shuffle(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    var date = new Date();
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log(array);

    return array;
    
  }
}
