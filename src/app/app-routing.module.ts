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
    // ------------ routing version 1 ------------
  //   { path: "de", component: LandingPageComponent,
  //     children: [
  //       { path: "impressum", component: ImpressumComponent },
  //       { path: "units", component: UnitHubComponent,
  //         children: [
  //           { path: 'project/:title', component: ProjectComponent},
  //           { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //           { path: 'perspective/:title', component: PerspectiveComponent},
  //           // { path: '', redirectTo:'', pathMatch:"full" }
  //         ]
  //       },
  //     ]
  //   },
  //   { path: "en", component: LandingPageComponent,
  //   children: [
  //     { path: "impressum", component: ImpressumComponent},
  //     { path: "units", component: UnitHubComponent,
  //       children: [
  //         { path: 'project/:title', component: ProjectComponent},
  //         { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //         { path: 'perspective/:title', component: PerspectiveComponent},
  //         // { path: '', redirectTo:'', pathMatch:"full" }
  //       ]
  //     },
  //   ]
  // },
  //   { path: "**", redirectTo: "de" }

  // ------------ routing version 2 ------------
    { path: ":language", component: LandingPageComponent,
    children: [
      { path: "impressum", component: ImpressumComponent },
      { path: "units", component: UnitHubComponent,
        children: [
          { path: 'project/:title', component: ProjectComponent},
          { path: 'podcast/:title', component: PodcastEpisodesComponent},
          { path: 'perspective/:title', component: PerspectiveComponent},
          // { path: '', redirectTo:'', pathMatch:"full" }
        ]
      },
    ]
  },
  { path: "**", redirectTo: "de" }


//   { path: "", component: LandingPageComponent,
//   children: [
//     { path: "impressum", component: ImpressumComponent },
//     { path: "units", component: UnitHubComponent,
//       children: [
//         { path: 'project/:title', component: ProjectComponent},
//         { path: 'podcast/:title', component: PodcastEpisodesComponent},
//         { path: 'perspective/:title', component: PerspectiveComponent},
//         // { path: '', redirectTo:'', pathMatch:"full" }
//       ]
//     },
//   ]
// },
// { path: "**", redirectTo: "" }


  // // ------------ routing version 3 (alternative) ------------
  // { path: ":language", component: LandingPageComponent},
  // { path: ":language/impressum", component: ImpressumComponent },
  // { path: ":language/units", component: UnitHubComponent,
  //   children: [
  //     { path: 'project/:title', component: ProjectComponent},
  //     { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //     { path: 'perspective/:title', component: PerspectiveComponent},
  //     // { path: '', redirectTo:'', pathMatch:"full" }
  //   ]
  // },
  // { path: "**", redirectTo: "de" }

  // { path: "", component: LandingPageComponent},
  // { path: "impressum", component: ImpressumComponent },
  // { path: "units", component: UnitHubComponent,
  //   children: [
  //     { path: 'project/:title', component: ProjectComponent},
  //     { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //     { path: 'perspective/:title', component: PerspectiveComponent},
  //     // { path: '', redirectTo:'', pathMatch:"full" }
  //   ]
  // },
  // { path: "**", redirectTo: "" }




  // ------------ ignore the following routing ------------
  // { path: "preview",
  // component: PreviewComponent,
  // children: [
  //   { path: 'project/:title', component: ProjectComponent},
  //   { path: 'podcast/:title', component: PodcastEpisodesComponent},
  //   { path: 'perspective/:title', component: PerspectiveComponent},
  // ]
  // },
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
