import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing_page/landing-page.component';
import { AboutComponent } from './landing_page/about/about.component';
import { ArtistListComponent } from './landing_page/artist-list/artist-list.component';
import { ProgramComponent } from './landing_page/program/program.component';
import { TeamComponent } from './landing_page/team/team.component';

import { UnitHubComponent } from './pages/unit-hub/unit-hub.component';
import { PreviewComponent } from './pages/preview/preview.component';

import { ImpressumComponent} from './impressum/impressum.component';
import { ProjectComponent} from './pages/project/project.component';
import { PerspectiveComponent} from './pages/perspective/perspective.component';
import { PodcastEpisodesComponent } from './pages/podcast-episodes/podcast-episodes.component';

import { AnnouncementComponent } from './pages/announcement/announcement.component';


const routes: Routes = [
  // { path: "", component: AnnouncementComponent},
  { path: "", component: LandingPageComponent},
  { path: ":language/impressum", component: ImpressumComponent },
  { path: ":language/ueber", component: AboutComponent},
  { path: ":language/programm", component: ProgramComponent},
  { path: ":language/teilnehmer_innen", component: ArtistListComponent},
  { path: ":language/index", component: UnitHubComponent},
  { path: ':language/index/project/:title', component: ProjectComponent},
  { path: ':language/index/podcast/:title', component: PodcastEpisodesComponent},
  { path: ':language/index/perspective/:title', component: PerspectiveComponent},
  { path: "**", redirectTo: "de"}
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
