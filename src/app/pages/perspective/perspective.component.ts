import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute } from '@angular/router';
import { SideCommentPositionService } from '../../services/side-comment-position.service';


@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit, AfterViewInit {
  perspectiveID : string = "";
  perspective:any;
  // perspectives: any = [];
  constructor(
    private perspectiveSvc: PerspectiveService,
    private route: ActivatedRoute,
    private sideCommentPosition: SideCommentPositionService,
    ) { }

  

  ngAfterViewInit(): void {
    this.activate_site_comments(this.sideCommentPosition);
    this.sideCommentPosition.listenResizeWindow();
  }
  activate_site_comments(site_comment_service:any){
    setTimeout(() =>{ 
      site_comment_service.scanMarkdowns();
      const side_comments = Array.from(document.getElementsByClassName('side_comment') as HTMLCollectionOf<HTMLElement>)
      side_comments.forEach(item => {
        item.style.opacity = "1";
        item.classList.add("fade-in");
        // console.log("# # # ///////////////////"+item);
      });
    }, 1000);
  }

  ngOnInit() {
    // this.perspectiveSvc.getAllPerspectives().subscribe((res:any) => {
    //   this.perspectives = res;
    // });
    this.route.params.subscribe( p => this.perspectiveID = p['id'] );

    this.perspectiveSvc.getPerspective(this.perspectiveID).subscribe((res:any) => {
      this.perspective = res;
      return console.log("project data array: " + this.perspective );
    });

  }

}
