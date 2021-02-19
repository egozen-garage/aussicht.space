import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit  {
  title = 'aussicht.space';
  posts : any[] = [];

  constructor(private http: HttpClient){ }


  // communication with WordPress -->
  // communication with WordPress --> -->
  // communication with WordPress --> --> -->
  // communication with WordPress --> --> --> -->
  ngOnInit(): void{
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