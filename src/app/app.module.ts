import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CategoryComponent } from './category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './player/player.component';
import { AboutComponent } from './landing_page/about/about.component';
import { TeamComponent } from './landing_page/team/team.component';
import { ArtistListComponent } from './landing_page/artist-list/artist-list.component';
import { ProgramComponent } from './landing_page/program/program.component';
import { QuestionsComponent } from './landing_page/questions/questions.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    PlayerComponent,
    AboutComponent,
    TeamComponent,
    ArtistListComponent,
    ProgramComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
