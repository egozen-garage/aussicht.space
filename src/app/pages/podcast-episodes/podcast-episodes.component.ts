import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PodcastepisodesService } from '../../services_strapi/podcastepisodes.service';
import { PlayerComponent } from '../../player/player.component';
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-podcast-episodes',
  templateUrl: './podcast-episodes.component.html',
  styleUrls: ['./podcast-episodes.component.scss']
})

export class PodcastEpisodesComponent implements OnInit {

  public play: boolean = true;
  public pause : boolean = false;

  apiUrl = environment.apiUrl;
  podcastID : string = "";
  podcast:any;

  constructor(
    private podcastSvc: PodcastepisodesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe( p => this.podcastID = p['id'] );

    this.podcastSvc.getPodcastEpisode(this.podcastID).subscribe((res:any) => {
      this.podcast = res;
      return console.log("podcast data array: " + this.podcast );
    });
    
  }

  togglePlayPause() {
    this.play = !this.play;
    this.pause = !this.pause;

    
  }
}
