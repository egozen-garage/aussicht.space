import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { ProjectService } from 'src/app/services_strapi/project.service';

import { BundleAllAPIsService } from '../../../services_strapi/bundle-all-apis.service'

@Component({
  selector: 'app-previous-next',
  templateUrl: './previous-next.component.html',
  styleUrls: ['./previous-next.component.scss']
})
export class PreviousNextComponent implements OnInit {

  previous_unit_type : string | undefined;
  previous_item : string | undefined;
  next_unit_type : any;
  next_item : any;

  bundledAPIs:any;

  subscription: Subscription | undefined;
  unitAndEncodedHrefList: any;

  currentTitle: string = "";
  currentCounter = "";

  constructor(
    private BundleAllAPIs: BundleAllAPIsService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router,
    // private projectSvc: ProjectService,
  ) { 
  }
  
  ngOnInit(): void { 

    this.subscription = this.BundleAllAPIs.bundledContentAPIs.subscribe((message: string) => {
      if (message == '') {
        return; // Ignore empty initial message
      }
      this.unitAndEncodedHrefList = message;
      console.log("previous next has: " + this.unitAndEncodedHrefList);


      this.route.params.subscribe( p => {
        this.currentTitle = p['title'];
          for (let i=0; i<this.unitAndEncodedHrefList.length; i++) {
            let HrefList = this.unitAndEncodedHrefList[i];
            if (HrefList.titleEncoded == this.currentTitle) {
              this.currentCounter = HrefList.counter;
              console.log("current counter is: " + this.currentCounter);
              console.log("counter: " + this.currentCounter);
              // prepare router links for NEXT
              let NextCounter:number = Number(this.currentCounter) + 1;
              if(NextCounter >= this.unitAndEncodedHrefList.length-1){
                NextCounter = 0;
              }
              this.next_unit_type = this.unitAndEncodedHrefList[NextCounter].unit.unit_type;
              this.next_item = this.unitAndEncodedHrefList[NextCounter].titleEncoded;
    
              // prepare router links for PREVIOUS
              let PreviousCounter:number = Number(this.currentCounter) - 1; 
              if(PreviousCounter < 0){
                PreviousCounter = this.unitAndEncodedHrefList.length - 1;
              }
              this.previous_unit_type = this.unitAndEncodedHrefList[PreviousCounter].unit.unit_type;
              this.previous_item = this.unitAndEncodedHrefList[PreviousCounter].titleEncoded;
              console.log("previous_unit_type: " + this.previous_unit_type);
              console.log("previous_item: " + this.previous_item);
              return;
            }
          }  
          
      });
    }); 


  }


  next(){
    // prepare router links for NEXT
    // let NextCounter:number = Number(this.currentCounter) + 1;
    // if(NextCounter >= this.unitAndEncodedHrefList.length-1){
    //   NextCounter = 0;
    // }
    // let next_unit_type = this.unitAndEncodedHrefList[NextCounter].titleEncoded;
    // let next_item = this.unitAndEncodedHrefList[NextCounter].unit.unit_type;
    // let newRoute = next_unit_type + "/" + next_item;

    // this.router.navigate(["units", newRoute]);

    // console.log("next title: " + this.unitAndEncodedHrefList[NextCounter].titleEncoded);
    // console.log("next title: " + this.unitAndEncodedHrefList[NextCounter].unit.unit_type);
    // console.log("next counter is: " + NextCounter);
    // console.log("amount of items: " + this.unitAndEncodedHrefList.length);
  }
  
  previous(){
    // prepare router links for PREVIOUS
    // let PreviousCounter:number = Number(this.currentCounter) - 1; 
    // if(PreviousCounter < 0){
    //   PreviousCounter = this.unitAndEncodedHrefList.length - 1;
    // }
    // let previous_unit_type = this.unitAndEncodedHrefList[PreviousCounter].titleEncoded;
    // let previous_item = this.unitAndEncodedHrefList[PreviousCounter].unit.unit_type;

    // this.router.navigate([{previous_unit_type}, {previous_item}]);
  }


}
