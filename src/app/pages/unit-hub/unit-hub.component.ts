import { Component, HostListener, OnInit } from '@angular/core';
// import { ProjectService } from '../../services_strapi/project.service';
// import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ThemeService } from '../../services_strapi/theme.service';
// import { PodcastepisodesService } from '../../services_strapi/podcastepisodes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
// import { HelperService } from "../../services/helper.service";
import { BundleAllAPIsService } from '../../services_strapi/bundle-all-apis.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-unit-hub',
  templateUrl: './unit-hub.component.html',
  styleUrls: ['./unit-hub.component.scss']
})
export class UnitHubComponent implements OnInit {


  // @Output() EVENTafterPageLoad = new EventEmitter();

  nColumns: number = 1;
  columns: any[] = [[]];


  apiUrl = environment.apiUrl;

  unitAndEncodedHrefList: any;

  // projects: any = [];
  // projectId: any = [];
  // projectsFromCms: any;

  // perspectives: any = [];
  // perspectiveId: any = [];
  // perspectivesFromCms: any;

  // podcasts: any = [];
  // podcastId: any = [];
  // podcastsFromCms: any;

  themesFromCms: any;
  themesSelected: any = [];


  header: any;
  btns: any;
  public isVisited = false;


  subscription: Subscription | undefined;


  constructor(
    // private projectSvc: ProjectService,
    // private perspectiveSvc: PerspectiveService,
    // private podcastSvc: PodcastepisodesService,
    // private helperService: HelperService,
    private themeSvc: ThemeService,
    public route: ActivatedRoute,
    private router: Router,
    private BundleAllAPIs: BundleAllAPIsService,
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // console.log("-+-+-+-+-+-+-" + this.unitAndEncodedHrefList);
      // this.BundleAllAPIs.bundleAllAPIs(this.unitAndEncodedHrefList);
      // this.BundleAllAPIs.callContentAPIs();
    }
    
    
    
    ngOnInit(): void {
      this.subscription = this.BundleAllAPIs.bundledContentAPIs.subscribe((message: string) => {
        if (message == '') {
          return; // Ignore empty initial message
        }
        this.unitAndEncodedHrefList = message;
        console.log(" is there any message? " + this.unitAndEncodedHrefList);
        if (this.unitAndEncodedHrefList) {
          this.resetAndFillColumns();
        }
        
      });


      this.updateNColumns();
      this.resetAndFillColumns;

      // this.unitAndEncodedHrefList = this.BundleAllAPIs.unitAndEncodedHrefList;

      
      // this.BundleAllAPIs.updateUnits().subscribe((res:any) => {
      //   this.unitAndEncodedHrefList = res;
      //   console.log(" + + + unitAndEncodedHrefList: " );
      // });
      
    // this.projectSvc.getAllProjects().subscribe((res:any) => {
    //   this.projectsFromCms = res;
    //   this.projects = this.projectsFromCms;
    //   this.updateUnits();
    //   if (this.unitAndEncodedHrefList) {
    //     this.resetAndFillColumns();
    //   }
    //   // this.EVENTafterPageLoad.emit();

    // });
    // console.log("length of projects: " + this.projects.length);


    // this.perspectiveSvc.getAllPerspectives().subscribe((res:any) => {
    //   this.perspectives = res;
    //   this.perspectivesFromCms = this.perspectives;
    //   this.updateUnits();
    //   if (this.unitAndEncodedHrefList) {
    //     this.resetAndFillColumns();
    //   }
    // });

    // this.podcastSvc.getAllPodcastEpisodes().subscribe((res:any) => {
    //   this.podcasts = res;
    //   this.podcastsFromCms = this.podcasts;
    //   this.updateUnits();
    //   if (this.unitAndEncodedHrefList) {
    //     this.resetAndFillColumns();
    //   }
    // });


    this.themeSvc.getAllThemes().subscribe((res:any) => {
      // this.themesFromCms = res;
      this.themesFromCms = res.props.themes;
      this.themesSelected = this.themesFromCms;
      console.log("+ + ++ + + themesFromCms" + this.themesFromCms);
      
    });




  }

  @HostListener('window:resize', ['$event'])
  private updateNColumns() {
    let nColumnsNew = Math.ceil(window.innerWidth / 500);
    if (this.nColumns !== nColumnsNew) {
      this.nColumns = nColumnsNew;
      this.resetAndFillColumns();
    }
  }

  private resetAndFillColumns() {
    let emptyColumns: any = Array(this.nColumns).fill(0).map(() => []);
    if (this.unitAndEncodedHrefList) {
      for (let i = 0; i < this.unitAndEncodedHrefList.length; i++) {
        emptyColumns[i % emptyColumns.length].push(this.unitAndEncodedHrefList[i]); 
      }
      this.columns = emptyColumns;
    }
  }

  // updateUnits(): void {
  //   if (!this.projectsFromCms || !this.perspectivesFromCms || !this.podcastsFromCms) {
  //     return;
  //   }
  //   let counter = -1;
  //   let orderedUnits = [ ...this.projectsFromCms, ...this.perspectivesFromCms, ...this.podcastsFromCms ];
  //   let today = new Date();
  //   let seed = today.getDate() + today.getMonth()*31 + today.getFullYear() * 366;
  //   let shuffledUnits = this.shuffle(orderedUnits, seed);
  //   this.unitAndEncodedHrefList = shuffledUnits.map((u: any) => {
  //     console.log("counter = " + counter);
  //     counter = counter + 1;
  //     return {
  //       counter: counter,
  //       unit: u,
  //       titleEncoded: this.helperService.encodeCustomURI(u.title)
  //     }
      
  //   });

    // console.log("item numbert 0: " + this.unitAndEncodedHrefList[65].titleEncoded);
    // console.log("item with counter: " + this.unitAndEncodedHrefList[65].counter);
    // console.log("amount of items: " + this.unitAndEncodedHrefList.length);
      
  // }

  // shuffle(array: any[], seed: number) {                // <-- ADDED ARGUMENT
  //   var m = array.length, t, i;

  //   // While there remain elements to shuffle…
  //   while (m) {

  //     // Pick a remaining element…
  //     i = Math.floor(this.random(seed) * m--);        // <-- MODIFIED LINE

  //     // And swap it with the current element.
  //     t = array[m];
  //     array[m] = array[i];
  //     array[i] = t;
  //     ++seed                                     // <-- ADDED LINE
  //   }

  //   return array;
  // }

  // random(seed: number) {
  //   var x = Math.sin(seed++) * 10000;
  //   return x - Math.floor(x);
  // }


  getSelected() {
    // 1. Determine the checked checkboxes
    // 1.a none or every checkbox is checked: No filter happens
    // 2. Read cms-units, then filter cms-units (related to checked checkboxes), then assign to units-variable
    // 3. angular repaints automatically
    this.themesSelected = this.themesFromCms.filter((theme: any) => theme.selected);
    let noThemeSelected = !this.themesSelected.length;
    if (noThemeSelected) {
      this.themesSelected = this.themesFromCms;
    }

    // calls out the selected state of current units
    // seems to only call out values from the parent array perspectives...maybe not correct

    this.BundleAllAPIs.updateUnits();
    // this.updateUnits();

    // this.units = this.units.filter((unit:any) => {
    //   // this looks for the boolean value inside the API array [unit [ {themes.selected}, {...} ] ]
    //   return unit.themes.some((themeOfUnit: any) => {
    //     return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
    //   });
    // });
    this.unitAndEncodedHrefList = this.unitAndEncodedHrefList.sort((unit1: any, unit2: any) => {
      let x = unit1.unit.themes.some((themeOfUnit: any) => {
        return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
      });
      let y = unit2.unit.themes.some((themeOfUnit: any) => {
        return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
      });
      return (x === y)? 0 : x? -1 : 1;
      });

    for (let uh of this.unitAndEncodedHrefList) {
      for (let theme of uh.unit.themes) {
        theme.selected =
          this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === theme.theme_name) && !noThemeSelected;
      }
    }
    this.resetAndFillColumns();
  }

//   foo(unit1: any, unit2: any) {
//     console.log("this: ", this);
//     let x = unit1.themes.some((themeOfUnit: any) => {
//       return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
//     });
//     let y = unit2.themes.some((themeOfUnit: any) => {
//       return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
//     });
//     return (x === y)? 0 : x? -1 : 1;
// }

  // isThemeOfUnitSelected(unit: any) {
  //   return unit.themes.some((themeOfUnit: any) => {
  //     return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
  //   });
  // }

  // public checkVisited(theme_id: any) {
  //   // reverse the value of property
  //   // this.isVisited = !this.isVisited;

  //   if ( theme_id == true ) {
  //     console.log("active checkbox is:", theme_id);
  //   }
  //   // else if (this.isVisited == false) {
  //   //   console.log('false');
  //   // }
  // }





    // if(this.isVisited){
    //   console.log("selected:", this.themesSelected);
    //   const selected_theme = document.getElementById("unit-theme-selected-" + theme_id);
    //   selected_theme?.setAttribute("style", "background-color: black; color: white;")
    // }
    // if(!this.isVisited){
    //   console.log("deselected");
    //   const selected_theme = document.getElementById("unit-theme-selected-" + theme_id);
    //   selected_theme?.setAttribute("style", "background-color: white; color: black;")
    // }

    // if(this.isVisited){
    //   const selected_theme = document.getElementById("unit-theme-selected-" + theme_id);
    //   selected_theme?.setAttribute("style", "background-color: white; color: black;")
    // }
    // else {
    //   const selected_theme = document.getElementById("unit-theme-selected-" + theme_id);
    //   selected_theme?.setAttribute("style", "background-color: black; color: white;")
  // }
}
