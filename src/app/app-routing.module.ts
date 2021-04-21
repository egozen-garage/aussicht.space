import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing_page/landing-page.component';
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component';
import { PreviewComponent } from './pages/preview/preview.component';

import { ImpressumComponent} from './impressum/impressum.component';
import { ProjectComponent} from './pages/project/project.component';
import { PerspectiveComponent} from './pages/perspective/perspective.component';
import { PodcastEpisodesComponent } from './pages/podcast-episodes/podcast-episodes.component';


// const routes: Routes = [
//   { path: "", component: LandingPageComponent },
//   { path: "units",
//     component: UnitHubComponent,
//     children: [
//       { path: 'project/:title', component: ProjectComponent},
//       { path: 'podcast/:title', component: PodcastEpisodesComponent},
//       { path: 'perspective/:title', component: PerspectiveComponent},
//     ]
//   },
//   { path: "preview",
//   component: PreviewComponent,
//   children: [
//     { path: 'project/:title', component: ProjectComponent},
//     { path: 'podcast/:title', component: PodcastEpisodesComponent},
//     { path: 'perspective/:title', component: PerspectiveComponent},
//   ]
//   },
//     { path: "impressum", component: ImpressumComponent},
//     { path: "**", redirectTo: "" }
// ];

const routes: Routes = [
  { path: "", component: LandingPageComponent},
  { path: "index", component: UnitHubComponent},
  { path: 'index/project/:title', component: ProjectComponent},
  { path: 'index/podcast/:title', component: PodcastEpisodesComponent},
  { path: 'index/perspective/:title', component: PerspectiveComponent},

  // { path: "preview",
  // component: PreviewComponent,
  // children: [
  //   { path: 'project/:title', component: ProjectComponent},
  //   { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //   { path: 'perspective/:title', component: PerspectiveComponent},
  // ]
  // },
    { path: "impressum", component: ImpressumComponent},
    { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    // enableTracing: true,
    //scrollOffset: [0, 0],
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
