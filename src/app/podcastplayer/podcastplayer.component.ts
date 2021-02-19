import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-podcastplayer',
  templateUrl: './podcastplayer.component.html',
  styleUrls: ['./podcastplayer.component.scss'],
})

export class PodcastplayerComponent implements OnInit, AfterViewInit {
  // xml Podcast data
  public xmlItems: any;

  // variables for player functionality 
  public showPodcastList : boolean;
  audio_files = '';

  constructor(private http: HttpClient, private viewContainerRef: ViewContainerRef){ 
    // this.loadXML();
    this.showPodcastList = false;
  }

  //@ViewChild('audio_files') audio_files: ElementRef;

  ngAfterViewInit() {
    console.log(this.viewContainerRef); 
  }

  ngOnInit() : void { 
    this.loadXML(); 
  }
  loadXML() {  
    this.http.get('/assets/xml/podcast.xml',
    //this.http.get('https://anchor.fm/s/3b4cd0ac/podcast/rss',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
      .subscribe((data: any) => {
        this.parseXML(data)  
          .then((data) => {  
            this.xmlItems = data;  
            console.log("array: " + this.xmlItems[0].url);
          }); 
          
      });  
  } 
  parseXML(data: any) {  
    var podcastCounter = 0;
    var countingUP = 0; 

    return new Promise(resolve => {  
      var k: string | number,  
        arr : any[] = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data.toString(), function (err: any, result: any) {  
        var obj = result.rss.channel[0]; 
        for (k in obj.item) {
          podcastCounter = podcastCounter + 1;
        }
        for (k in obj.item) {  
          var singleItem = obj.item[k]; 
          
          //editing the TITLE
          var rawtitle = singleItem.title;
          var titleWithNumber = rawtitle.toString().replace(/#/,'');
          var title = titleWithNumber.substr(titleWithNumber.indexOf(" ") + 1);

          //editing the DATE
          var rawDate = singleItem.pubDate;
          var date = rawDate.toString().substring(5, 16);

          podcastCounter = podcastCounter - 1; 
          arr.push({  
            countingUP: countingUP,
            episode: "#" + podcastCounter,
            title: title,
            date: date,  
            url: singleItem.enclosure[0].$.url,  
            length: singleItem.enclosure[0].$.length
          }); 
          countingUP = countingUP + 1;
        }
        
        resolve(arr);  
      });
      

    });

  }

}