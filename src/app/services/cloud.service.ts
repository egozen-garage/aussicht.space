import { Injectable } from "@angular/core";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as xml2js from 'xml2js';
import { of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class CloudService implements OnInit {
  files: any = [
    {
      countingUP: 0,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
      name: "Wird unsere Zukunft virtuell erweitert sein?",
      author: "Off_line",
      episode: "#14",
      date: "10 Feb 2021",
      length: 65956309,
    },{
      countingUP: 1,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
      name: "Wie informieren wir die Zukunft?",
      author: "Off_line",
      episode: "#13",
      date: "03 Feb 2021",
      length: 48337632,
    },{
      countingUP: 0,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
      name: "Wird unsere Zukunft virtuell erweitert sein?",
      author: "Off_line",
      episode: "#14",
      date: "10 Feb 2021",
      length: 65956309,
    },{
      countingUP: 1,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
      name: "Wie informieren wir die Zukunft?",
      author: "Off_line",
      episode: "#13",
      date: "03 Feb 2021",
      length: 48337632,
    },{
      countingUP: 0,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
      name: "Wird unsere Zukunft virtuell erweitert sein?",
      author: "Off_line",
      episode: "#14",
      date: "10 Feb 2021",
      length: 65956309,
    },{
      countingUP: 1,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
      name: "Wie informieren wir die Zukunft?",
      author: "Off_line",
      episode: "#13",
      date: "03 Feb 2021",
      length: 48337632,
    },{
      countingUP: 0,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
      name: "Wird unsere Zukunft virtuell erweitert sein?",
      author: "Off_line",
      episode: "#14",
      date: "10 Feb 2021",
      length: 65956309,
    },{
      countingUP: 1,
      url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
      name: "Wie informieren wir die Zukunft?",
      author: "Off_line",
      episode: "#13",
      date: "03 Feb 2021",
      length: 48337632,
    }
  ];


  constructor(private http: HttpClient) {
    this.loadXML();
  }

  ngOnInit(): void {
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
            this.files = data;
            // for (let i = 0; i < 13; i++) {
            //   console.log("object: " + this.files[i]);
            //   console.log("array counter: " + this.files[i].countingUP);
            //   console.log("array URL: " + this.files[i].url);
            //   console.log("array NAME: " + this.files[i].name);
            //   console.log("array author: " + this.files[i].author);
            //   console.log("array episode: " + this.files[i].episode);
            //   console.log("array date: " + this.files[i].date);
            //   console.log("array length: " + this.files[i].length);
            // }
          });
      });
  }
  parseXML(data: any) {
    var podcastCounter = 0;
    var countingUP = 0;

    return new Promise(resolve => {
      var k: string | number,
        arr: any[] = [],
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
          var titleWithNumber = rawtitle.toString().replace(/#/, '');
          var title = titleWithNumber.substr(titleWithNumber.indexOf(" ") + 1);

          //editing the DATE
          var rawDate = singleItem.pubDate;
          var date = rawDate.toString().substring(5, 16);

          podcastCounter = podcastCounter - 1;
          arr.push({
            countingUP: countingUP,
            url: singleItem.enclosure[0].$.url,
            name: title,
            author: "Off_line",
            episode: "#" + podcastCounter,
            date: date,
            length: singleItem.enclosure[0].$.length
          });
          countingUP = countingUP + 1;
        }
        resolve(arr);
      });
    });
  }



  getFiles() {
    return of(this.files);
  }
}