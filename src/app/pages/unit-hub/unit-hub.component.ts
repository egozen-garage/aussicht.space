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
  themesSelected: any = [];
  projectId: any = [];
  perspectiveId: any = [];
  projectsFromCms: any;
  perspectivesFromCms: any;
  themesFromCms: any;

  constructor(
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    private themeSvc: ThemeService,
    public route: ActivatedRoute,
    ) { }


  checked() {
    
  }

  ngOnInit(): void {
    this.projectSvc.getAllProjects().subscribe((res:any) => {
      this.projectsFromCms = res;
      this.projects = this.projectsFromCms;
      this.updateUnits();
    });

    this.perspectiveSvc.getAllPerspectives().subscribe((res:any) => {
      this.perspectives = res;
      this.perspectivesFromCms = this.perspectives;
      this.updateUnits();
    });

    this.themeSvc.getAllThemes().subscribe((res:any) => {
      this.themesFromCms = res;
      this.themesSelected = this.themesFromCms;
    });
    
  }

  updateUnits(): void {
    this.units = [ ...this.projectsFromCms, ...this.perspectivesFromCms ];
    let today = new Date();
    let seed = today.getDate() + today.getMonth()*31 + today.getFullYear() * 366;
    this.units = this.shuffle(this.units, seed);
  }

  shuffle(array: any[], seed: number) {                // <-- ADDED ARGUMENT
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(this.random(seed) * m--);        // <-- MODIFIED LINE
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed                                     // <-- ADDED LINE
    }
  
    return array;
  }
  
  random(seed: number) {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
  }

  getSelected() {
    // 1. Determine the checked checkboxes
    // 1.a none or every checkbox is checked: No filter happens
    // 2. Read cms-units, then filter cms-units (related to checked checkboxes), then assign to units-variable
    // 3. angular repaints automatically
    this.themesSelected = this.themesFromCms.filter((theme: any) => theme.selected);
    if (!this.themesSelected.length) {
      this.themesSelected = this.themesFromCms;
    }

    // calls out the selected state of current units
    // seems to only call out values from the parent array perspectives...maybe not correct
    this.updateUnits();
    console.log("this.units:", this.units);
    console.log("this.themesSelected:", this.themesSelected);
    this.units = this.units.filter((unit:any) => {
      // this looks for the boolean value inside the API array [unit [ {themes.selected}, {...} ] ]
      return unit.themes.some((themeOfUnit: any) => {
        return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
      });
    });
    console.log("this.units = ", this.units);
  }


  // shuffle(array:any) {
  //   var currentIndex = array.length, temporaryValue, randomIndex;
  //   var date = new Date();
  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  
  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
    
  // }
}
