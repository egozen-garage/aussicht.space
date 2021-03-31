import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { StreamState } from "../interfaces/stream-state";
import * as xml2js from 'xml2js';
import { map } from 'jquery';
import { CurrentTrackService } from '../services/current-track.service';
import { Subscription } from 'rxjs';



declare var setDocHeight: () => void;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit{
  ShowPodcastList: boolean | undefined;
  files: Array<any> = [];
  state : StreamState | undefined;
  currentFile: any = {};
  toggleOpen = false;
  message:string | undefined;
  subscription: Subscription | undefined;

  constructor(
    public cloudService: CloudService,
    public audioService: AudioService,
    private renderer: Renderer2,
    private currentTrackService: CurrentTrackService
  ) {
    this.ShowPodcastList = false;
    // get media files
    cloudService.loadXML().subscribe((data: any) => {
      this.files = this.parseXML(data);
      
      this.pass_episode = this.files[0].episode;
      this.pass_author = this.files[0].author;
      this.pass_name = this.files[0].name;
      this.pass_date = this.files[0].date;
      this.pass_guests = this.files[0].guests;
      this.pass_raw_name = this.files[0].raw_name;
    });
    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  


  tooglebtn() {
    const podcastButton = document.getElementById('toggle-btn');
    const podcastButtonLogo = document.getElementById('btn-logo');

    this.ShowPodcastList = !this.ShowPodcastList;
    if (this.ShowPodcastList){
      this.toggleOpen = true;
      this.renderer.setStyle(podcastButton, 'height', '117px');
      this.renderer.setStyle(podcastButtonLogo, 'display', 'block');
      // document.getElementById("podcast-header").class.toggle-btn-expand
    } 
    if (!this.ShowPodcastList){
      this.toggleOpen = false;
      this.renderer.setStyle(podcastButton, 'height', '20px');
      this.renderer.setStyle(podcastButtonLogo, 'display', 'none');
    }
  }

  parseXML(data: any) {
    var podcastCounter = 0;
    var countingUP = 0;

      var k: string | number,
        arr: any[] = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data.toString(),  (err: any, result: any) => {
        var obj = result.rss.channel[0];
        for (k in obj.item) {
          podcastCounter = podcastCounter + 1;
        }
        for (k in obj.item) {
          var singleItem = obj.item[k];

          //editing the TITLE
          var rawtitle = singleItem.title;
          var podcastIdGroup = rawtitle.toString().match(/#[0-9]+/);
          var podcastId = '';
          if (podcastIdGroup) {
            podcastId = podcastIdGroup[0];
          }
          var titleWithNumber = rawtitle.toString().replace(/#/, '');
          var raw_title = titleWithNumber.substr(titleWithNumber.indexOf(" ") + 1);
          var title = raw_title.split('–')[0];
          var guests = raw_title.split('–').pop();
          var title = raw_title;

          //editing the DATE
          var rawDate = singleItem.pubDate;
          var date = rawDate.toString().substring(5, 16);

          podcastCounter = podcastCounter - 1;
          arr.push({
            countingUP: countingUP,
            podcastId: podcastId,
            url: singleItem.enclosure[0].$.url,
            raw_name: raw_title,
            name: title,
            guests: guests,
            author: "Off_line",
            episode: "#" + podcastCounter,
            date: date,
            length: singleItem.enclosure[0].$.length
          });
          countingUP = countingUP + 1;
        }


      });
      return arr;
    }

  pass_episode:any;
  pass_name:any;
  pass_author:any;
  pass_date:any;
  pass_guests:any;
  pass_raw_name:any;
  public ngOnInit() {
    this.subscription = this.currentTrackService.currentFileAndIndex.subscribe((message: string) => {
      let parts = message.split("_");
      let action = parts[1];
      if (action == "stopped") {
        this.stop();
        return;
      }
      let podcastId = parts[0];
      this.message = message;
      let currentFile;
      let currentIndex;
      for(let i=0; i<this.files.length; i++) {
        if (this.files[i].podcastId == ("#" + podcastId)) {
          currentFile = this.files[i];
          currentIndex = i;
        }
      }
      // Nachschlagen in lokalen daten anhand der id
      this.openFile(currentFile, currentIndex);
    });
    // const appHeight = () => {
    //   const doc = document.documentElement
    //   doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    // }
    
    // window.addEventListener('resize', appHeight)
    // appHeight()
  }

  ngAfterViewInit(): void {
  }


  playStream(url:any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file:any, index: any) {
    if (!file || !index) {
      return;
    }
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);

    this.pass_episode = file.episode;
    this.pass_author = file.author;
    this.pass_name = file.name;
    this.pass_date = file.date;
    this.pass_guests = file.guests;
    this.pass_raw_name = file.raw_name;
  }


  playpause(){
    if(this.state?.playing == true){
      this.audioService.pause();
    }else{
      if ( this.audioService.audioObj.src == ""){
        let file = this.files[0].url;
        let index = 0;
        this.currentFile = { index, file };
        this.audioService.stop();
        this.audioService.playStream(file).subscribe(events => { });
      } else {
        this.audioService.play();
      }
    }

  }
  pause() {
    this.audioService.pause();
  }

  play() {
    
    //this.audioService.play();
    if ( this.audioService.audioObj.src == ""){
      let file = this.files[0].url;
      let index = 0;
      this.currentFile = { index, file };
      this.audioService.stop();
      this.audioService.playStream(file).subscribe(events => { });
    } else {
      this.audioService.play();
    }
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }
  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: { value: any; }) {
    this.audioService.seekTo(change.value);
  }


  resize_player_container = '';
  ListColor = '#0a4ace';
  slideListInOut = '';
  // ShowPlayerList(){
  //   console.log("swipe it");
    
  //   // console.log("hello World");
  //   //chang podcastplayer height to 150px;
  //   // this.resize_player_container = '150px';
  //   // this.ListColor = 'blue';
  //   //this.slideListInOut = 'all 0.5s ease-in-out';
  //   // this.slideListInOut = '0.5s ease-out 0s 1 slideUp;';
  //   // console.log("show the list");
  // }
  // HidePlayerList(){
  //   // this.resize_player_container = '50px';
  //   //this.ShowList = 'collapse';
  //   //this.slideListInOut = 'all 0.5s ease-in-out';
  //   // this.slideListInOut = '0.5s ease-out 0s 1 slideUp';
  //   // console.log("hide the list");
  // }

  CallSetDocHeight() {
    setDocHeight();
  }

}
