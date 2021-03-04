import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing_page/landing-page.component'
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component'
import { ImpressumComponent} from './impressum/impressum.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "unit-hub", component: UnitHubComponent },
  { path: "impressum", component: ImpressumComponent},
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
