import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing_page/landing-page.component';
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component';
import { PreviewComponent } from './pages/preview/preview.component';

import { ImpressumComponent} from './impressum/impressum.component';
import { ProjectComponent} from './pages/project/project.component';
import { PerspectiveComponent} from './pages/perspective/perspective.component';
import { PodcastEpisodesComponent } from './pages/podcast-episodes/podcast-episodes.component';

const routes: Routes = [
  // ---------------- routing version from master branch
  // { path: "", component: LandingPageComponent, pathMatch: 'full'},
  // { path: "units", component: UnitHubComponent},
  // { path: 'units/project/:title', component: ProjectComponent},
  // { path: 'units/podcast/:title', component: PodcastEpisodesComponent},
  // { path: 'units/perspective/:title', component: PerspectiveComponent},
  // { path: "impressum", component: ImpressumComponent},
  // { path: "**", redirectTo: "de", pathMatch: 'full' }

 

  // // ------------ jakobs addabtion ------------
  { path: "", component: LandingPageComponent},
  { path: ":language/impressum", component: ImpressumComponent },
  { path: ":language/units", component: UnitHubComponent},
  { path: ':language/units/project/:title', component: ProjectComponent},
  { path: ':language/units/podcast/:title', component: PodcastEpisodesComponent},
  { path: ':language/units/perspective/:title', component: PerspectiveComponent},
  { path: "**", redirectTo: "de"}

  // // ------------ back up routing version 2 ------------
  // { path: ":language", component: LandingPageComponent, pathMatch:"full",
  //   children: [
  //     { path: "impressum", component: ImpressumComponent },
  //     { path: "units", component: UnitHubComponent,
  //       children: [
  //         { path: 'project/:title', component: ProjectComponent},
  //         { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //         { path: 'perspective/:title', component: PerspectiveComponent},
  //         { path: '', redirectTo:'', pathMatch:"full" }
  //       ]
  //     },
  //   ]
  // },
  // { path: "**", redirectTo: "de" }

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

}
