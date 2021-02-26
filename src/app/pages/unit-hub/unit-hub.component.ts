import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-unit-hub',
  templateUrl: './unit-hub.component.html',
  styleUrls: ['./unit-hub.component.scss']
})
export class UnitHubComponent implements OnInit {

  posts : any[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
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
