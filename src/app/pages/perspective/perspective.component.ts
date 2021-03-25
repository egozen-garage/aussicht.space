import { Component, OnInit } from '@angular/core';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

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
    ) { }


  ngOnInit() {

    this.route.params.subscribe( p => this.perspectiveID = p['id'] );

    this.perspectiveSvc.getPerspective(this.perspectiveID).subscribe((res:any) => {
      this.perspective = res;
      return console.log("perspective data array: " + this.perspective );
    });

  }

}
