import { AfterViewInit } from '@angular/core';
import { Directive, Output, EventEmitter, Input, SimpleChange, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddimages]'
})
export class AddimagesDirective implements AfterViewInit, OnInit{

  @Output() loadImages: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  
  ngAfterViewInit(): void {
    // this.loadImages.emit('dummy'); 
    console.log("element is da");
  }
  ngOnInit() {

  } 
  addImagesToArtist(folder_name:string){
    this.loadImages.emit('dummy'); 
    console.log(folder_name);
    console.log("is it running?");
    
  } 

}
