import { Component, HostListener, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProjectService } from '../services_strapi/project.service';
import { PerspectiveService } from '../services_strapi/perspective.service';
import { PodcastepisodesService } from '../services_strapi/podcastepisodes.service';
import { ThemeService } from '../services_strapi/theme.service';
import { HelperService } from "../services/helper.service";

import { EMPTY, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class BundleAllAPIsService {


  public nColumns: number = 1;
  public columns: any[] = [[]];



  public unitAndEncodedHrefList: any;

  public projects: any = [];
  public projectId: any = [];
  public projectsFromCms: any;

  public perspectives: any = [];
  public perspectiveId: any = [];
  public perspectivesFromCms: any;

  public podcasts: any = [];
  public podcastId: any = [];
  public podcastsFromCms: any;

  public themesFromCms: any;
  public themesSelected: any = [];


  public header: any;
  public btns: any;
  public isVisited = false;

  constructor(
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    private podcastSvc: PodcastepisodesService,
    private helperService: HelperService,
    // private themeSvc: ThemeService,
  ) { 

    this.callContentAPIs();
  }

  private APIsources = new BehaviorSubject('');
  public bundledContentAPIs = this.APIsources.asObservable();

  bundleAllAPIs(APIs: any) {
    this.APIsources.next(APIs);
  }
    
  ngOnInit(): void {
  }
  
  callContentAPIs(){
    // this.updateNColumns();
    // this.resetAndFillColumns;

    this.projectSvc.getAllProjects().subscribe((res:any) => {
      this.projectsFromCms = res;
      this.projects = this.projectsFromCms;
      this.updateUnits();
      // if (this.unitAndEncodedHrefList) {
      //   this.resetAndFillColumns();
      // }
    });
    this.perspectiveSvc.getAllPerspectives().subscribe((res:any) => {
      this.perspectives = res;
      this.perspectivesFromCms = this.perspectives;
      this.updateUnits();
      // if (this.unitAndEncodedHrefList) {
      //   this.resetAndFillColumns();
      // }
    });
    this.podcastSvc.getAllPodcastEpisodes().subscribe((res:any) => {
      this.podcasts = res;
      this.podcastsFromCms = this.podcasts;
      this.updateUnits();
      // if (this.unitAndEncodedHrefList) {
      //   this.resetAndFillColumns();
      // }
    });
    // this.themeSvc.getAllThemes().subscribe((res:any) => {
    //   this.themesFromCms = res;
    //   this.themesSelected = this.themesFromCms;
    // });


  }

  // @HostListener('window:resize', ['$event'])
  // private updateNColumns() {
  //   let nColumnsNew = Math.ceil(window.innerWidth / 500);
  //   if (this.nColumns !== nColumnsNew) {
  //     this.nColumns = nColumnsNew;
  //     this.resetAndFillColumns();
  //   }
  // }

  // private resetAndFillColumns() {
  //   let emptyColumns: any = Array(this.nColumns).fill(0).map(() => []);
  //   if (this.unitAndEncodedHrefList) {
  //     for (let i = 0; i < this.unitAndEncodedHrefList.length; i++) {
  //       emptyColumns[i % emptyColumns.length].push(this.unitAndEncodedHrefList[i]);
  //     }
  //     this.columns = emptyColumns;
  //   }
  // }

  updateUnits(){
    if (!this.projectsFromCms || !this.perspectivesFromCms || !this.podcastsFromCms) {
      return;
    }
    let counter:number = -1;
    let orderedUnits = [ ...this.projectsFromCms, ...this.perspectivesFromCms, ...this.podcastsFromCms ];
    let today = new Date();
    let seed = today.getDate() + today.getMonth()*31 + today.getFullYear() * 366;
    let shuffledUnits = this.shuffle(orderedUnits, seed);
    this.unitAndEncodedHrefList = shuffledUnits.map((u: any) => {
      console.log("counter = " + counter);
      counter = counter + 1;
      return {
        counter: counter,
        unit: u,
        titleEncoded: this.helperService.encodeCustomURI(u.title)
      }
    });
    this.bundleAllAPIs(this.unitAndEncodedHrefList);
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


  // getSelected() {
  //   // 1. Determine the checked checkboxes
  //   // 1.a none or every checkbox is checked: No filter happens
  //   // 2. Read cms-units, then filter cms-units (related to checked checkboxes), then assign to units-variable
  //   // 3. angular repaints automatically
  //   this.themesSelected = this.themesFromCms.filter((theme: any) => theme.selected);
  //   let noThemeSelected = !this.themesSelected.length;
  //   if (noThemeSelected) {
  //     this.themesSelected = this.themesFromCms;
  //   }

  //   // calls out the selected state of current units
  //   // seems to only call out values from the parent array perspectives...maybe not correct

  //   this.updateUnits();
  //   // this.updateUnits();

  //   // this.units = this.units.filter((unit:any) => {
  //   //   // this looks for the boolean value inside the API array [unit [ {themes.selected}, {...} ] ]
  //   //   return unit.themes.some((themeOfUnit: any) => {
  //   //     return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
  //   //   });
  //   // });
  //   this.unitAndEncodedHrefList = this.unitAndEncodedHrefList.sort((unit1: any, unit2: any) => {
  //     let x = unit1.unit.themes.some((themeOfUnit: any) => {
  //       return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
  //     });
  //     let y = unit2.unit.themes.some((themeOfUnit: any) => {
  //       return this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
  //     });
  //     return (x === y)? 0 : x? -1 : 1;
  //     });

  //   for (let uh of this.unitAndEncodedHrefList) {
  //     for (let theme of uh.unit.themes) {
  //       theme.selected =
  //         this.themesSelected.some((selectedTheme: any) => selectedTheme.theme_name === theme.theme_name) && !noThemeSelected;
  //     }
  //   }
  //   this.resetAndFillColumns();
  // }

}
