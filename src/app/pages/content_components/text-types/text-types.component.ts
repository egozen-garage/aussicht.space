import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SideCommentPositionService } from '../../../services/side-comment-position.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-text-types',
  templateUrl: './text-types.component.html',
  styleUrls: ['./text-types.component.scss']
})
export class TextTypesComponent implements OnInit, AfterViewInit {
  @Input() body:any;
  isMobile: boolean | undefined;
  isTablet: boolean | undefined;
  isDesktopDevice: boolean | undefined;
  deviceInfo:any;

  constructor(
    private sideCommentPosition: SideCommentPositionService,
    private deviceService: DeviceDetectorService,
    // private sanitizer: DomSanitizer
    ) { }

  toggleContent(){
    var icon = document.querySelector('.icon');
    icon!.classList.toggle('show-more');
  }

  ngOnInit(): void {
    // let body = this.body;
    // body = this.sanitizer.bypassSecurityTrustScript(require("/src/assets/custom_design_files/js_files/" + javascript_file_name));
        // READ OUT DEVICE TYPE
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log("isMobile: " + this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("isTablet: " + this.isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("isDesktopDevice: " + this.isDesktopDevice);
  }

  ngAfterViewInit(): void {
    this.activate_site_comments(this.sideCommentPosition);
    this.sideCommentPosition.listenResizeWindow();
  }

  activate_site_comments(site_comment_service:any){
    setTimeout(() =>{ 
      site_comment_service.scanMarkdowns();
      const side_comments = Array.from(document.getElementsByClassName('side_comment') as HTMLCollectionOf<HTMLElement>)
      side_comments.forEach(item => {
        item.classList.add("fade");
        // item.style.opacity = "1";
        // console.log("# # # ///////////////////"+item);
      });
    }, 3000);
  }


}
