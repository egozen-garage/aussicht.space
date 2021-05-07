import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { PerspectiveService } from '../../services_strapi/perspective.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { SideCommentPositionService } from '../../services/side-comment-position.service';
import { CurrentLanguageService } from '../../services_strapi/language/current-language.service';

// import { RouteReuseStrategy } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { HelperService } from "../../services/helper.service";

@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;
  private perspectiveTitle: string = "";
  perspective:any;
  language:string | undefined ;

  subscription: Subscription | undefined;
  language_prefix:string|undefined;
  language_equivalent_page:string | undefined;

  // perspectives: any = [];
  constructor(
    private perspectiveSvc: PerspectiveService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private sideCommentPosition: SideCommentPositionService,
    private router: Router,
    private currentLanguage: CurrentLanguageService,
    // private routeReuseStrategy: RouteReuseStrategy,
    ) {
      this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
        this.language_prefix = language;
      });
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

  // When the user scrolls the page, execute myFunction 

  ngOnInit() {
    this.route.params.subscribe( p => {
      this.perspectiveTitle = p['title'];
      this.perspectiveSvc.currentPerspectiveSource.subscribe((allPerspectives:any) => {
      // this.perspectiveSvc.getAllPerspectives().subscribe((allPerspectives:any[]) => {
        for (let i=0; i<allPerspectives.length; i++) {
          let perspective = allPerspectives[i];
          if (this.helperService.encodeCustomURI(perspective.title) == this.perspectiveTitle) {
            this.perspective = perspective;
            if( this.language_prefix === "de"){
              this.language_equivalent_page = this.title2url("perspective/", perspective.en_equivalent.title);              
            } else if (this.language_prefix === "en") {
              this.language_equivalent_page = this.title2url("perspective/", perspective.de_equivalent.title);
            } else {
              this.language_equivalent_page = this.title2url("perspective/", perspective.de_equivalent.title);
            }
            return;
          }
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.sideCommentPosition.run_side_comments(); 
  }

@HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  var scrollID = document.getElementById("scrollBar");
  scrollID!.style.width = scrolled + "%";
} 

title2url(unit_type:string, relatedTitle:string){
  let titleEncoded = this.helperService.encodeCustomURI(relatedTitle);    
  // this.router.navigate(['/', this.language, 'index', unit_type, this.titleEncoded]);
  let language_equivalent_page = unit_type + titleEncoded;
  return language_equivalent_page;
}


}
