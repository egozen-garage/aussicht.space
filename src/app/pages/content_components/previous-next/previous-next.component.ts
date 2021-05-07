import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { ProjectService } from 'src/app/services_strapi/project.service';
import { BundleAllAPIsService } from '../../../services_strapi/bundle-all-apis.service'
import { CurrentLanguageService } from '../../../services_strapi/language/current-language.service';

// language:string | undefined ;
// private currentLanguage: CurrentLanguageService,
// ngOnInit(): void { 
//   this.currentLanguage.currentLanguage.subscribe(res => {
//     this.language = res;
//   });
// }


@Component({
  selector: 'app-previous-next',
  templateUrl: './previous-next.component.html',
  styleUrls: ['./previous-next.component.scss']
})
export class PreviousNextComponent implements OnInit {

  @Input() unit_type:any;

  previous_button_name:any;
  next_button_name:any;

  language:string | undefined ;
  index:string = "index";

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
    private currentLanguage: CurrentLanguageService,
    // private projectSvc: ProjectService,
  ) { 
    this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      if( language === "de"){
        this.previous_button_name = "Vorheriges";
        this.next_button_name = "Nächstes";
      } else if (language === "en") {
        this.previous_button_name = "previous";
        this.next_button_name = "next";
      } else {
        this.previous_button_name = "previous";
        this.next_button_name = "next";
      }
    });
  }
  
  ngOnInit(): void { 
    this.currentLanguage.currentLanguage.subscribe(res => {
      this.language = res;
    });

    this.subscription = this.BundleAllAPIs.bundledContentAPIs.subscribe((message: string) => {
      if (message == '') {
        return; // Ignore empty initial message
      }
      this.unitAndEncodedHrefList = message;

      this.route.params.subscribe( p => {
        this.currentTitle = p['title'];
        for (let i=0; i<this.unitAndEncodedHrefList.length; i++) {
          let HrefList = this.unitAndEncodedHrefList[i];
          if (HrefList.titleEncoded == this.currentTitle) {
            this.currentCounter = HrefList.counter;
            // prepare router links for NEXT
            let NextCounter:number = Number(this.currentCounter) + 1;
            if(NextCounter > this.unitAndEncodedHrefList.length-1){
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
            return;
          }
        }  
      });
    }); 
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
      if (event.key === 'ArrowLeft') {
        // previous
        this.router.navigate(['/' + this.language, this.index, this.previous_unit_type, this.previous_item ]);
      } else if (event.key === 'ArrowRight') {
        // next
        this.router.navigate(['/' + this.language, this.index, this.next_unit_type, this.next_item ]);
      }
    
  }

  next(){
    this.router.navigate(['/' + this.language, this.index, this.next_unit_type, this.next_item ]);
  }
  previous(){
    this.router.navigate(['/' + this.language, this.index, this.previous_unit_type, this.previous_item ]);
  }


}
