import { Component, OnInit } from '@angular/core';
import { QuestionsComponent } from './questions/questions.component';
import { ProgramComponent } from './program/program.component';
import { AboutComponent } from './about/about.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
