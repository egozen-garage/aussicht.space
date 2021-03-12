import { Injectable } from "@angular/core";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as xml2js from 'xml2js';
import { of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class CloudService implements OnInit {
  temp:any;
  tempPodcastArray: any = [];
  arr: any[] = [];
  files: any = [
    // {
    //   countingUP: 0,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
    //   name: "Wird unsere Zukunft virtuell erweitert sein?",
    //   author: "Off_line",
    //   episode: "#14",
    //   date: "10 Feb 2021",
    //   length: 65956309,
    // },{
    //   countingUP: 1,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
    //   name: "Wie informieren wir die Zukunft?",
    //   author: "Off_line",
    //   episode: "#13",
    //   date: "03 Feb 2021",
    //   length: 48337632,
    // },{
    //   countingUP: 0,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
    //   name: "Wird unsere Zukunft virtuell erweitert sein?",
    //   author: "Off_line",
    //   episode: "#14",
    //   date: "10 Feb 2021",
    //   length: 65956309,
    // },{
    //   countingUP: 1,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
    //   name: "Wie informieren wir die Zukunft?",
    //   author: "Off_line",
    //   episode: "#13",
    //   date: "03 Feb 2021",
    //   length: 48337632,
    // },{
    //   countingUP: 0,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
    //   name: "Wird unsere Zukunft virtuell erweitert sein?",
    //   author: "Off_line",
    //   episode: "#14",
    //   date: "10 Feb 2021",
    //   length: 65956309,
    // },{
    //   countingUP: 1,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
    //   name: "Wie informieren wir die Zukunft?",
    //   author: "Off_line",
    //   episode: "#13",
    //   date: "03 Feb 2021",
    //   length: 48337632,
    // },{
    //   countingUP: 0,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26439804/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-9%2Fdfa99dbf-91be-c10a-27df-f990e88f5420.mp3",
    //   name: "Wird unsere Zukunft virtuell erweitert sein?",
    //   author: "Off_line",
    //   episode: "#14",
    //   date: "10 Feb 2021",
    //   length: 65956309,
    // },{
    //   countingUP: 1,
    //   url: "https://anchor.fm/s/3b4cd0ac/podcast/play/26093050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-2%2F134b88bc-1328-2ac4-65a1-270cdc871b92.mp3",
    //   name: "Wie informieren wir die Zukunft?",
    //   author: "Off_line",
    //   episode: "#13",
    //   date: "03 Feb 2021",
    //   length: 48337632,
    // }
  ];

  constructor(private http: HttpClient) {
    this.loadXML();
    // console.log("arr dataset 1: " + this.arr.length);
    console.log("files dataset 1: " + this.files.length);
  }

  ngOnInit(): void {
  }

  loadXML() {
    return this.http.get('/assets/xml/podcast.xml',
    //return this.http.get('/s/3b4cd0ac/podcast/rss',
    //return this.http.get('https://anchor.fm/s/3b4cd0ac/podcast/rss',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      });
  }




  getFiles() {
    // return of(this.files);
    console.log("is somting happening?");
    console.log("array: "+ this.tempPodcastArray[0]);
    return of(this.tempPodcastArray);
  }

}