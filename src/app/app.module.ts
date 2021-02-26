import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './player/player.component';
import { AboutComponent } from './landing_page/about/about.component';
import { TeamComponent } from './landing_page/team/team.component';
import { ArtistListComponent } from './landing_page/artist-list/artist-list.component';
import { ProgramComponent } from './landing_page/program/program.component';
import { QuestionsComponent } from './landing_page/questions/questions.component';

import { AddimagesDirective } from './directives/addimages.directive';
import { CheckArtistHoverPipe } from './pipes/check-artist-hover.pipe';
import { ArtistListOldComponent } from './landing_page/artist-list-old/artist-list-old.component';
import { MouseCursorTrailComponent } from './mouse-cursor-trail/mouse-cursor-trail.component';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { LandingPageComponent } from './landing_page/landing-page.component';
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component'

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{ 
    // override hammerjs defautl configuration
    'swipe': { direction: Hammer.DIRECTION_ALL}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlayerComponent,
    AboutComponent,
    TeamComponent,
    ArtistListComponent,
    ProgramComponent,
    QuestionsComponent,
    AddimagesDirective,
    CheckArtistHoverPipe,
    ArtistListOldComponent,
    MouseCursorTrailComponent,
    LandingPageComponent,
    UnitHubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
    ],
    providers: [ {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
