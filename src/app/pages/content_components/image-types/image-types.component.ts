import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-image-types',
  templateUrl: './image-types.component.html',
  styleUrls: ['./image-types.component.scss']
})
export class ImageTypesComponent implements OnInit {
  @Input() body:any;
  constructor(private renderer: Renderer2) { }

  //  onIntersection () {
  //   console.log("detect image");
    
  //   var intersect = document.getElementById("singleImage");
  //   intersect!.classList.add("animate");
  //   intersect!.classList.add("fadeIn");
  //   intersect!.classList.add("one");
  // }

  ngOnInit(): void {
  }

}
