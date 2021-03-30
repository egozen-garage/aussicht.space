import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from "./services_strapi/project.service";
import { PerspectiveService } from "./services_strapi/perspective.service";
import { PodcastepisodesService } from "./services_strapi/podcastepisodes.service";

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
    private projectSvc: ProjectService,
    private perspectiveSvc: PerspectiveService,
    private podcastSvc: PodcastepisodesService
    // public platform: Platform,
    // private breakpointObserver: BreakpointObserver
    ){ }

    
  // isWideScreen$: Observable<boolean> | undefined;
  ngOnInit(): void{
    // Fill each service cache to speed up the pages where the data is actually 3needed
    this.projectSvc.getAllProjects().subscribe();
    this.perspectiveSvc.getAllPerspectives().subscribe();
    this.podcastSvc.getAllPodcastEpisodes().subscribe();
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