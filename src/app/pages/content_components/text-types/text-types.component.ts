import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SideCommentPositionService } from '../../../services/side-comment-position.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-text-types',
  templateUrl: './text-types.component.html',
  styleUrls: ['./text-types.component.scss']
})
export class TextTypesComponent implements OnInit, AfterViewInit {
  @Input() body:any;

  constructor(
    private sideCommentPosition: SideCommentPositionService,
    // private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    // let body = this.body;
    // body = this.sanitizer.bypassSecurityTrustScript(require("/src/assets/custom_design_files/js_files/" + javascript_file_name));
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
