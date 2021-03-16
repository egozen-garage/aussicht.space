import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services_strapi/project.service';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ThemeService } from '../../services_strapi/theme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-hub',
  templateUrl: './unit-hub.component.html',
  styleUrls: ['./unit-hub.component.scss']
})
export class UnitHubComponent implements OnInit {


  projects: any = [];
  perspectives: any = [];
  units: any;
  themes: any = [];
  constructor(
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    private themeSvc: ThemeService,
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
    this.themeSvc.getAllThemes().subscribe((res:any) => {
      this.themes = res;
      console.log("this.themes: ", this.themes);
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
