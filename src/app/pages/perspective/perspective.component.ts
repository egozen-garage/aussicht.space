import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
// import { SideCommentPositionService } from '../../services/side-comment-position.service';
// import { RouteReuseStrategy } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { HelperService } from "../../services/helper.service";

@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit {
  apiUrl = environment.apiUrl;
  private perspectiveTitle: string = "";
  perspective:any;

  // perspectives: any = [];
  constructor(
    private perspectiveSvc: PerspectiveService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    // private router: Router,
    // private routeReuseStrategy: RouteReuseStrategy,
    ) {
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      // this.route.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // };
    }



  // MERGE OF INCOMING CHANGE OF origin/feature/url-parameter-with-title-instead-of-id COMMIT
  // activate_site_comments(site_comment_service:any){
  //   setTimeout(() =>{
  //     site_comment_service.scanMarkdowns();
  //     const side_comments = Array.from(document.getElementsByClassName('side_comment') as HTMLCollectionOf<HTMLElement>)
  //     side_comments.forEach(item => {
  //       item.classList.add("fade");
  //       // item.style.opacity = "1";
  //       // console.log("# # # ///////////////////"+item);
  //     });
  //   }, 3000);
  // }

  ngOnInit() {
    this.route.params.subscribe( p => {
      this.perspectiveTitle = p['title'];
      this.perspectiveSvc.getAllPerspectives().subscribe((allPerspectives:any[]) => {
        for (let i=0; i<allPerspectives.length; i++) {
          let perspective = allPerspectives[i];
          if (this.helperService.encodeCustomURI(perspective.title) == this.perspectiveTitle) {
            this.perspective = perspective;
            return;
          }
        }
      });
    });
  }

}
