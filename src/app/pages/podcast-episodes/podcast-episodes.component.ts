import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PodcastepisodesService } from '../../services_strapi/podcastepisodes.service';
import { PlayerComponent } from '../../player/player.component';
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";
import * as xml2js from 'xml2js';
import { CurrentTrackService } from 'src/app/services/current-track.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-podcast-episodes',
  templateUrl: './podcast-episodes.component.html',
  styleUrls: ['./podcast-episodes.component.scss']
})

export class PodcastEpisodesComponent implements OnInit {

  public play: boolean = true;
  public pause : boolean = false;

  apiUrl = environment.apiUrl;
  podcastTitle: string = "";
  podcast:any;
  subscription: Subscription | undefined;

  constructor(
    private podcastSvc: PodcastepisodesService,
    private route: ActivatedRoute,
    private currentTrackService: CurrentTrackService
  ) { }

  ngOnInit() {
    this.subscription = this.currentTrackService.currentFileAndIndex.subscribe((message: string) => {
      if (message == '') {
        return; // Ignore empty initial message
      }
      let parts = message.split("_");
      let action = parts[1];
      this.play = (action == "stopped");
      this.pause = !this.play;
    });

    this.route.params.subscribe( p => {
      this.podcastTitle = p['title'];
      this.podcastSvc.getAllPodcastEpisodes().subscribe((allPodcastEpisodes:any[]) => {
        for (let i=0; i<allPodcastEpisodes.length; i++) {
          let podcastEpisode = allPodcastEpisodes[i];
          if (encodeURIComponent(podcastEpisode.title) == this.podcastTitle) {
            this.podcast = podcastEpisode;
            return;
          }
        }
      });
    });
  }

  togglePlayPause() {
    if (this.play) {
      this.currentTrackService.changeTrack("#" + this.podcast.episode_id + "_started");
    } else {
      this.currentTrackService.changeTrack("#" + this.podcast.episode_id + "_stopped");
    }
  }
}
