import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PodcastepisodesService } from '../../services_strapi/podcastepisodes.service';
import { PlayerComponent } from '../../player/player.component';
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";
import * as xml2js from 'xml2js';
import { CurrentTrackService } from 'src/app/services/current-track.service';
import { CurrentLanguageService } from '../../services_strapi/language/current-language.service';
import { Subscription } from 'rxjs';
import { HelperService } from "../../services/helper.service";

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
  subscription_language: Subscription | undefined;
  language_prefix:string|undefined;
  language_equivalent_page:string | undefined;

  constructor(
    private podcastSvc: PodcastepisodesService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private currentTrackService: CurrentTrackService,
    private currentLanguage: CurrentLanguageService,
  ) { 
    this.subscription_language = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      this.language_prefix = language;
    });
  }

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
      this.podcastSvc.currentPodcastSource.subscribe((allPodcastEpisodes:any) => {
      // this.podcastSvc.getAllPodcastEpisodes().subscribe((allPodcastEpisodes:any[]) => {
        for (let i=0; i<allPodcastEpisodes.length; i++) {
          let podcastEpisode = allPodcastEpisodes[i];
          if (this.helperService.encodeCustomURI(podcastEpisode.title) == this.podcastTitle) {
            this.podcast = podcastEpisode;
            if( this.language_prefix === "de"){
              this.language_equivalent_page = this.title2url("podcast/", podcastEpisode.en_equivalent.title);              
            } else if (this.language_prefix === "en") {
              this.language_equivalent_page = this.title2url("podcast/", podcastEpisode.de_equivalent.title);
            } else {
              this.language_equivalent_page = this.title2url("podcast/", podcastEpisode.de_equivalent.title);
            }
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

  title2url(unit_type:string, relatedTitle:string){
    let titleEncoded = this.helperService.encodeCustomURI(relatedTitle);    
    // this.router.navigate(['/', this.language, 'index', unit_type, this.titleEncoded]);
    let language_equivalent_page = unit_type + titleEncoded;
    return language_equivalent_page;
  }

  // ngAfterViewInit() {
  //   const previousButton = document.getElementById("prev-btn");
  //   const nextButton = document.getElementById("next-btn");
  //   const back2HubButton = document.getElementById("back2hub");

  //   previousButton!.setAttribute('style', 'color:white !important;');
  //   nextButton!.setAttribute('style', 'color:white !important;');
  //   back2HubButton!.setAttribute('style', 'color:white !important;');
  // }
}
