import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SideCommentPositionService } from '../../../services/side-comment-position.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { relativeTimeThreshold } from 'moment';


@Component({
  selector: 'app-text-types',
  templateUrl: './text-types.component.html',
  styleUrls: ['./text-types.component.scss']
})
export class TextTypesComponent implements OnInit, AfterViewInit {
  @Input() body:any;

  constructor(
    private sideCommentPosition: SideCommentPositionService,
    private deviceService: DeviceDetectorService,
    ) { }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktopDevice = this.deviceService.isDesktop();
    
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    // if (this.body.__component === 'text-types.paragraph-with-relation' && this.isMobile){
    //   console.log("start mobile comments");    
    //   this.sideCommentPosition.mobile_side_comments();
    // } else if (this.body.__component === 'text-types.paragraph-with-relation' && !this.isMobile){
    //   console.log("no non no non no Mobile");
    //   this.activate_site_comments(this.sideCommentPosition);
    //   this.sideCommentPosition.listenResizeWindow();
    // }
  }


  // activate_site_comments(site_comment_service:any){
  //   setTimeout(() =>{ 
  //     site_comment_service.scanMarkdowns();
  //     const side_comments = Array.from(document.getElementsByClassName('side_comment') as HTMLCollectionOf<HTMLElement>)
  //     side_comments.forEach(item => {
  //       item.classList.add("fade");
  //       // item.style.opacity = "1";
  //       // console.log("# # # ///////////////////"+item);
  //     });
  //   }, 1000);
  // }


}
