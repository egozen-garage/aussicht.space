import { Component, OnInit } from '@angular/core';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit {
  perspectiveID : string = "";
  perspective:any;
  // perspectives: any = [];
  constructor(
    private perspectiveSvc: PerspectiveService,
    private route: ActivatedRoute,
    ) { }

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
