import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MarkdownModule, MarkedOptions } from "ngx-markdown";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './player/player.component';
import { AboutComponent } from './landing_page/about/about.component';
import { TeamComponent } from './landing_page/team/team.component';
import { ArtistListComponent } from './landing_page/artist-list/artist-list.component';

import { ProgramComponent } from './landing_page/program/program.component';
// import { GoogleSheetsDbService } from 'ng-google-sheets-db';

import { QuestionsComponent } from './landing_page/questions/questions.component';

import { AddimagesDirective } from './directives/addimages.directive';
import { CheckArtistHoverPipe } from './pipes/check-artist-hover.pipe';
import { ArtistListOldComponent } from './landing_page/artist-list-old/artist-list-old.component';
import { MouseCursorTrailComponent } from './mouse-cursor-trail/mouse-cursor-trail.component';

// import * as Hammer from 'hammerjs';
// import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { LandingPageComponent } from './landing_page/landing-page.component';
import { UnitHubComponent } from './pages/unit-hub/unit-hub.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ProjectComponent } from './pages/project/project.component';
import { PerspectiveComponent } from './pages/perspective/perspective.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { CustomDesignIframeComponent } from './pages/custom_designs/custom-design-iframe/custom-design-iframe.component';
import { CustomDesignJavascriptComponent } from './pages/custom_designs/custom-design-javascript/custom-design-javascript.component';
import { CustomDesignHtmlCssComponent } from './pages/custom_designs/custom-design-html-css/custom-design-html-css.component';
import { SafePipe } from './pipes/safe.pipe';

import {Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy} from '@angular/common';
import {APP_BASE_HREF} from '@angular/common';
import { AnchorTimingDirective } from './directives/anchor-timing.directive';
import { PodcastEpisodesComponent } from './pages/podcast-episodes/podcast-episodes.component';
import { TextTypesComponent } from './pages/content_components/text-types/text-types.component';
import { ImageTypesComponent } from './pages/content_components/image-types/image-types.component';
import { BackToHubComponent } from './pages/content_components/back-to-hub/back-to-hub.component';
import { PreviousNextComponent } from './pages/content_components/previous-next/previous-next.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { Title2linkPipe } from './pipes/title2link.pipe';
import { TalksComponent } from './pages/talks/talks.component';
import { RecroomComponent } from './pages/recroom/recroom.component';
import { MachineEssayComponent } from './pages/content_components/machine-essay/machine-essay.component';

// export class MyHammerConfig extends HammerGestureConfig {
//   overrides = <any>{ 
//     // override hammerjs defautl configuration
//     'swipe': { direction: Hammer.DIRECTION_ALL}
//   }
// }

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
    ImpressumComponent,
    ProjectComponent,
    PerspectiveComponent,
    FilterPipe,
    CustomDesignIframeComponent,
    CustomDesignJavascriptComponent,
    CustomDesignHtmlCssComponent,
    SafePipe,
    AnchorTimingDirective,
    PodcastEpisodesComponent,
    TextTypesComponent,
    ImageTypesComponent,
    BackToHubComponent,
    PreviousNextComponent,
    AnnouncementComponent,
    LanguageSwitchComponent,
    Title2linkPipe,
    TalksComponent,
    RecroomComponent,
    MachineEssayComponent,
  ],

  imports: [
    MarkdownModule.forRoot({
      // loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ],
  
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: APP_BASE_HREF, useValue: '/' },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


