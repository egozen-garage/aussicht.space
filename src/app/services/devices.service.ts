import { Injectable, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// XSmall: '(max-width: 599.98px)',
// Small: '(min-width: 600px) and (max-width: 959.98px)',
// Medium: '(min-width: 960px) and (max-width: 1279.98px)',
// Large: '(min-width: 1280px) and (max-width: 1919.98px)',
// XLarge: '(min-width: 1920px)',

// Handset: '(max-width: 599.98px) and (orientation: portrait), ' +
//          '(max-width: 959.98px) and (orientation: landscape)',
// Tablet: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), ' +
//         '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
// Web: '(min-width: 840px) and (orientation: portrait), ' +
//      '(min-width: 1280px) and (orientation: landscape)',

// HandsetPortrait: '(max-width: 599.98px) and (orientation: portrait)',
// TabletPortrait: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)',
// WebPortrait: '(min-width: 840px) and (orientation: portrait)',

// HandsetLandscape: '(max-width: 959.98px) and (orientation: landscape)',
// TabletLandscape: '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
// WebLandscape: '(min-width: 1280px) and (orientation: landscape)',

@Injectable({
  providedIn: 'root'
})
export class DevicesService implements OnInit{

  public isMobileResolution: boolean;

  constructor(
    public platform: Platform,
    private breakpointObserver: BreakpointObserver
  ) {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    console.log("whats the mobile???" + this.isMobileResolution);
  } 

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  isWideScreen: Observable<boolean> | undefined;
  ngOnInit(): void {
    if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
      console.log("width is less than 600px");
    }
    this.isWideScreen = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map( ({matches}) => matches)
      );
    console.log("whats the val? " + this.isWideScreen);
    
  }

  

}
