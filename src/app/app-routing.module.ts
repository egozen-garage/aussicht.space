import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing_page/landing-page.component'
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component'

import { ImpressumComponent} from './impressum/impressum.component';
import { ProjectComponent} from './pages/project/project.component';
import { PerspectiveComponent} from './pages/perspective/perspective.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "units", 
    component: UnitHubComponent, 
    children: [
      { path: 'project/:id', component: ProjectComponent},
      { path: 'podcast/:id', component: ProjectComponent},
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
    // scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    // enableTracing: true, 
    // scrollOffset: [0, 0],
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
