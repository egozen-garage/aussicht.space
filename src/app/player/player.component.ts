import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { StreamState } from "../interfaces/stream-state";
import * as xml2js from 'xml2js';
import { map } from 'jquery';
import { CurrentTrackService } from '../services/current-track.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';



declare var setDocHeight: () => void;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit{
  ShowPodcastList: boolean | undefined;
  isMobile: boolean | undefined;
  isTablet: boolean | undefined;
  isDesktopDevice: boolean | undefined;
  deviceInfo:any;

  // detecting real-time window size
  public innerHeight: any;

  files: Array<any> = [];
  state : StreamState | undefined;
  currentFile: any = {};
  toggleOpen: boolean | undefined;
  message:string | undefined;
  subscription: Subscription | undefined;
  private streamIsSubscribed: boolean = false;
  podcastButton: HTMLElement | null = null;
  podcastButtonLogo: HTMLElement | null = null;
  podcastAreaAll: HTMLElement | null = null;
  
  constructor(
    public cloudService: CloudService,
    private deviceService: DeviceDetectorService,
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
 
  togglebtn() {
    if(!this.isMobile){
      this.ShowPodcastList = !this.ShowPodcastList;
      if (this.ShowPodcastList){
        this.toggleOpen = true;
      }
      if (!this.ShowPodcastList){
        this.toggleOpen = false;
      }
    }
  }

  togglebtn2() {
    if(this.isMobile){
      this.ShowPodcastList = !this.ShowPodcastList;
      if (this.ShowPodcastList){
        this.toggleOpen = true;
        this.renderer.setStyle(this.podcastButton, 'height', '60px');
        this.renderer.setStyle(this.podcastButtonLogo, 'display', 'block');
        // document.getElementById("podcast-header").class.toggle-btn-expand
      }
      if (!this.ShowPodcastList){
        this.toggleOpen = false;
        this.renderer.setStyle(this.podcastButton, 'height', '20px');
        this.renderer.setStyle(this.podcastButtonLogo, 'display', 'none');
      }
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

    // ---- READ VIEWPORT HEIGHT ON INIT AND DECLARE VARIABLE ---- //
    // Get the viewport height and multiply it by 1% to get a value for a vh unit
    this.innerHeight = window.innerHeight;
    let vh = this.innerHeight;
    // Then set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log("show me px value of window height on init", `${vh}px`);
    


    this.podcastButton = document.getElementById('toggle-btn');
    this.podcastButtonLogo = document.getElementById('btn-logo');
    this.podcastAreaAll = document.getElementById('podcast_area_all');

    this.subscription = this.currentTrackService.currentFileAndIndex.subscribe((message: string) => {
      if (message == '') {
        return; // Ignore empty initial message
      }
      let parts = message.split("_");
      let action = parts[1];
      if (action == "stopped") {
        this.pause();
        return;
      }
      let podcastId = parts[0];
      this.message = message;
      let currentFile;
      let currentIndex;
      for(let i=0; i<this.files.length; i++) {
        if (this.files[i].podcastId == podcastId) {
          currentFile = this.files[i];
          currentIndex = i;
        }
      }
      // Nachschlagen in lokalen daten anhand der id
      this.openFile(currentFile, currentIndex);
    });



    // READ OUT DEVICE TYPE
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log("isMobile: " + this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("isTablet: " + this.isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("isDesktopDevice: " + this.isDesktopDevice);

  }

  ngAfterViewInit(): void {
    // ---- LISTEN TO RESIZE EVENT ---- //
    // taken from Louis Hoebregs https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    window.addEventListener('resize', () => {
      // Execute same script as before
      let vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      console.log("show me value of vh afterviewinit", `${vh}px`);
    });
  }


  playStream(url:any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFileByUpdatingService(file: any, index: any) {
    this.currentTrackService.changeTrack(file.podcastId + "_started");
  }

  private openFile(file:any, index: any) {
    if (!file) {
      return;
    }
    this.currentFile = { index, file };
    this.audioService.stop();
    if (!this.streamIsSubscribed) {
      this.audioService.playStream(file).subscribe(events => { });
      this.streamIsSubscribed = true;
    }
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
      this.currentTrackService.changeTrack(this.currentFile.file.podcastId + "_stopped");
    }else{
      if ( this.audioService.audioObj.src == ""){
        let file = this.files[0];
        let index = 0;
        this.currentFile = { index, file };
        this.audioService.stop();
      }
      this.currentTrackService.changeTrack(this.currentFile.file.podcastId + "_started");
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
    this.openFileByUpdatingService(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFileByUpdatingService(file, index);
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

  CallSetDocHeight() {
    setDocHeight();
  }

}
