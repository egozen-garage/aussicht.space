import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-design-iframe',
  templateUrl: './custom-design-iframe.component.html',
  styleUrls: ['./custom-design-iframe.component.scss']
})
export class CustomDesignIframeComponent implements OnInit {

  @Input() project:any;
  @Input() body:any;



  
  safeSrc: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) { 

  }

  ngOnInit() {
    const unsafeSrc = this.project;
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(unsafeSrc);  
    console.log("/////////////////" + unsafeSrc);
      
  }

}