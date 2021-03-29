import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing_page/landing-page.component';
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component';
import { PreviewComponent } from './pages/preview/preview.component';

import { ImpressumComponent} from './impressum/impressum.component';
import { ProjectComponent} from './pages/project/project.component';
import { PerspectiveComponent} from './pages/perspective/perspective.component';
import { PodcastEpisodesComponent } from './pages/podcast-episodes/podcast-episodes.component';

import { DeviceDetectorService } from 'ngx-device-detector';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "units", 
    component: UnitHubComponent, 
    children: [
      { path: 'project/:id', component: ProjectComponent},
      { path: 'podcast/:id', component: PodcastEpisodesComponent},
      { path: 'perspective/:id', component: PerspectiveComponent},
    ]
  },
  { path: "preview", 
  component: PreviewComponent, 
  children: [
    { path: 'project/:id', component: ProjectComponent},
    { path: 'podcast/:id', component: PodcastEpisodesComponent},
    { path: 'perspective/:id', component: PerspectiveComponent},
  ]
},
  { path: "impressum", component: ImpressumComponent},
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
    //scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    // enableTracing: true, 
    //scrollOffset: [0, 0],
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { 

  constructor(private deviceService: DeviceDetectorService) {
    this.checkDeviceType();
  }

  deviceInfo:any;

  checkDeviceType(){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log("isMobile" + isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("isTablet" + isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("isDesktopDevice" + isDesktopDevice);
  }
}
