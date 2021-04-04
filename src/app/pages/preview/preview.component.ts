import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services_strapi/project.service';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ThemeService } from '../../services_strapi/theme.service';
import { PodcastepisodesService } from '../../services_strapi/podcastepisodes.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from "../../services/helper.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {


  unitAndEncodedHrefList: any;

  projects: any = [];
  projectId: any = [];
  projectsFromCms: any;

  perspectives: any = [];
  perspectiveId: any = [];
  perspectivesFromCms: any;

  podcasts: any = [];
  podcastId: any = [];
  podcastsFromCms: any;

  themesFromCms: any;
  themesSelected: any = [];


  header: any;
  btns: any;
  public isVisited = false;

  constructor(
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    private podcastSvc: PodcastepisodesService,
    private helperService: HelperService,
    private themeSvc: ThemeService,
    public route: ActivatedRoute,
    ) { }



  ngOnInit(): void {
    this.projectSvc.getAllProjects().subscribe((res:any) => {
      this.projectsFromCms = res;
      this.projects = this.projectsFromCms;
      this.updateUnits();
      // this.EVENTafterPageLoad.emit();

    });

    this.perspectiveSvc.getAllPerspectives().subscribe((res:any) => {
      this.perspectives = res;
      this.perspectivesFromCms = this.perspectives;
      this.updateUnits();
    });

    this.podcastSvc.getAllPodcastEpisodes().subscribe((res:any) => {
      this.podcasts = res;
      this.podcastsFromCms = this.podcasts;
      this.updateUnits();
    });


    this.themeSvc.getAllThemes().subscribe((res:any) => {
      this.themesFromCms = res;
      this.themesSelected = this.themesFromCms;
    });

  }

  updateUnits(): void {
    if (!this.projectsFromCms || !this.perspectivesFromCms || !this.podcastsFromCms) {
      return;
    }
    let orderedUnits = [ ...this.projectsFromCms, ...this.perspectivesFromCms, ...this.podcastsFromCms ];
    let today = new Date();
    let seed = today.getDate() + today.getMonth()*31 + today.getFullYear() * 366;
    let shuffledUnits = this.shuffle(orderedUnits, seed);
    this.unitAndEncodedHrefList = shuffledUnits.map((u: any) => {
      return {
        unit: u,
        titleEncoded: this.helperService.encodeCustomURI(u.title)
      }});
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
    let noThemeSelected = !this.themesSelected.length;
    if (noThemeSelected) {
      this.themesSelected = this.themesFromCms;
    }

    // calls out the selected state of current units
    // seems to only call out values from the parent array perspectives...maybe not correct
    this.updateUnits();
    // this.units = this.units.filter((unit:any) => {
    //   // this looks for the boolean value inside the API array [unit [ {themes.selected}, {...} ] ]
    //   return unit.themes.some((themeOfUnit: any) => {
    //     return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
    //   });
    // });
    this.unitAndEncodedHrefList = this.unitAndEncodedHrefList.sort((uh1: any, uh2: any) => {
      let x = uh1.unit.themes.some((themeOfUnit: any) => {
        return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
      });
      let y = uh2.unit.themes.some((themeOfUnit: any) => {
        return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
      });
      return (x === y)? 0 : x? -1 : 1;
      });

    for (let unit of this.unitAndEncodedHrefList) {
      for (let theme of unit.unit.themes) {
        theme.selected =
          this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === theme.theme_name) && !noThemeSelected;
      }
    }
  }

}
