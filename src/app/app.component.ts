import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Platform } from '@angular/cdk/platform';
// import { BreakpointObserver } from '@angular/cdk/layout'
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit  {
  title = 'aussicht.space';
  posts : any[] = [];

  constructor(
    private http: HttpClient,
    // public platform: Platform,
    // private breakpointObserver: BreakpointObserver

    ){ }


  // isWideScreen$: Observable<boolean> | undefined;
  ngOnInit(): void{
  // defining breakpoint for responsive desgin -->
  // defining breakpoint for responsive desgin --> -->
  // defining breakpoint for responsive desgin --> --> -->
  // defining breakpoint for responsive desgin --> --> --> -->
    // if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
    //   console.log("width is less than 600px");
    // }
    // this.isWideScreen$ = this.breakpointObserver.observe(['(min-width: 600px)']).pipe(map( ({matches}) => matches));

  // communication with WordPress -->
  // communication with WordPress --> -->
  // communication with WordPress --> --> -->
  // communication with WordPress --> --> --> -->
    this.http.get('http://localhost:8000/wp-json/wp/v2/posts').subscribe((data: any) =>{
      for(let key in data){
        if(data.hasOwnProperty(key)){
          this.posts.push(data[key]);
        }
      }
      //console.log(this.posts);
    })
  }
}