import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
// import { SideCommentPositionService } from '../../services/side-comment-position.service';
// import { RouteReuseStrategy } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit {
  apiUrl = environment.apiUrl;
  perspectiveID : string = "";
  perspective:any;

  // perspectives: any = [];
  constructor(
    private perspectiveSvc: PerspectiveService,
    private route: ActivatedRoute,
    // private router: Router,
    // private routeReuseStrategy: RouteReuseStrategy,
    ) { 
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      // this.route.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // };
    }

  



  ngOnInit() {
    this.route.params.subscribe( p => this.perspectiveID = p['id'] );

    this.perspectiveSvc.getPerspective(this.perspectiveID).subscribe((res:any) => {
      this.perspective = res;
      return console.log("perspective data array: " + this.perspective );
    });

  }

}
