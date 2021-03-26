import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PodcastepisodesService } from '../../services_strapi/podcastepisodes.service';

@Component({
  selector: 'app-podcast-episodes',
  templateUrl: './podcast-episodes.component.html',
  styleUrls: ['./podcast-episodes.component.scss']
})
export class PodcastEpisodesComponent implements OnInit {

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

}
