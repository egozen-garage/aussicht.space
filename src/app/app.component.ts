import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from "./services_strapi/project.service";
import { PerspectiveService } from "./services_strapi/perspective.service";
import { PodcastepisodesService } from "./services_strapi/podcastepisodes.service";
import { ThemeService } from './services_strapi/theme.service';

import { DeviceDetectorService } from 'ngx-device-detector';

// import { Platform } from '@angular/cdk/platform';
// import { BreakpointObserver } from '@angular/cdk/layout'
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit  {
  
    title = 'aussicht.space';
    posts : any[] = [];

  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    private podcastSvc: PodcastepisodesService,
    private themeSvc: ThemeService) {
    this.checkDeviceType();
  }

  deviceInfo:any;

  checkDeviceType(){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log("isMobile: " + isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("isTablet: " + isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("isDesktopDevice: " + isDesktopDevice);
  }



    

    // public platform: Platform,
    // private breakpointObserver: BreakpointObserver
    // ){ }

    
  // isWideScreen$: Observable<boolean> | undefined;
  ngOnInit(): void{
    // Fill each service cache to speed up the pages where the data is actually 3needed
    this.projectSvc.getAllProjects().subscribe();
    this.perspectiveSvc.getAllPerspectives().subscribe();
    this.podcastSvc.getAllPodcastEpisodes().subscribe();
    this.themeSvc.getAllThemes().subscribe();

  // defining breakpoint for responsive desgin -->
  // defining breakpoint for responsive desgin --> -->
  // defining breakpoint for responsive desgin --> --> -->
  // defining breakpoint for responsive desgin --> --> --> -->
    // if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
    //   console.log("width is less than 600px");
    // }
    // this.isWideScreen$ = this.breakpointObserver.observe(['(min-width: 600px)']).pipe(map( ({matches}) => matches));
  }
}