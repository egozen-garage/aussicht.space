import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-types',
  templateUrl: './image-types.component.html',
  styleUrls: ['./image-types.component.scss']
})
export class ImageTypesComponent implements OnInit {
  @Input() body:any;
  constructor() { }

  ngOnInit(): void {
  }

}
