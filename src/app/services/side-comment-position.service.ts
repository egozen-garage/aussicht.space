import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class SideCommentPositionService implements OnInit, AfterViewInit {
  resizeObservable$!: Observable<Event>;
  resizeSubscription$: Subscription = new Subscription;

  constructor(
    private deviceService: DeviceDetectorService
  ) {}
  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktopDevice = this.deviceService.isDesktop();

  ngOnInit(): void { 
  }
  ngAfterViewInit(): void {
  }


  run_side_comments(){
    if (this.isMobile || this.isTablet){
      this.mobile_side_comments();
    } else if (!this.isMobile){
      this.activate_site_comments();
      this.listenResizeWindow();
    }
  }

// ------ + ------- + ------ depending on timing
// improove: Call Function as soon as content is loaded!
  activate_site_comments(){
    setTimeout(() =>{ 
      this.scanMarkdowns();
      const side_comments = Array.from(document.getElementsByClassName('side_comment') as HTMLCollectionOf<HTMLElement>)
      side_comments.forEach(item => {
        item.classList.add("fade");
        // item.style.opacity = "1";
        // console.log("# # # ///////////////////"+item);
      });
    }, 1000);
  }

  listenResizeWindow(){
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.scanMarkdowns();
    }) 
  }

  // ----------------- create an array of all 'code' tags form STRAPI CMS -----------------
  scanMarkdowns(){
    const super_rich_text = document.getElementsByClassName("side_comment_container");
    // console.log("super_rich_text length: " + super_rich_text.length);
    
    for (var i = 0; i < super_rich_text.length; i++) {
      // console.log("super_rich_text nr.: " + i);
      let markdown_tag = super_rich_text[i].getElementsByTagName("markdown")[0];
      let position_of_markdown_tag = markdown_tag.getElementsByTagName("p")[0].offsetTop;
      let side_comments = this.collect_side_comments(super_rich_text[i]);
      this.collect_code_tags(markdown_tag, side_comments, position_of_markdown_tag);
    }
  }

  // collect all code tags within specific markdown 
  // calculate height position and transfer it to a side comment
  collect_code_tags(markdown_ID:any, side_comments:any,position_of_markdown_tag:any){
    let distance_paragraph_to_top, distance_keyword_to_top, distance_to_top_of_paragraph, additional_distance, difference;
    var distance_of_previous_comment = 0;
    let comment_height = 1;

    const code_tags = markdown_ID.getElementsByTagName("code");
    // console.log("amount code---------< " + code_tags.length );
    for (var i = 0; i < code_tags.length; i++) {
      distance_paragraph_to_top = position_of_markdown_tag;
      distance_keyword_to_top = this.calculate_position_of_code_tags(code_tags[i]);
      comment_height = side_comments[i].clientHeight;  // height of the current comment

      distance_to_top_of_paragraph = distance_keyword_to_top - distance_paragraph_to_top;
      additional_distance = distance_of_previous_comment - distance_to_top_of_paragraph;
      
      // console.log("/comment_height: " + comment_height);
      // console.log("/distance_paragraph_to_top: " + distance_paragraph_to_top);
      // console.log("/distance_keyword_to_top: " + distance_keyword_to_top);
      // console.log("/distance_to_top_of_paragraph: " + distance_to_top_of_paragraph);
      // console.log("/additional_distance: " + additional_distance);
      
      if (distance_to_top_of_paragraph < distance_of_previous_comment) {
        side_comments[i].style.marginTop =  0 + "px";
      } else {
        side_comments[i].style.marginTop =  distance_to_top_of_paragraph - distance_of_previous_comment + "px";
      }
      distance_of_previous_comment = comment_height;
    } 
  }

  // add window resize function
  calculate_position_of_code_tags(code_tag_ID:any){
    const code_tag_position = code_tag_ID.offsetTop;
    return code_tag_position;
  }

  collect_side_comments(super_rich_text_ID:any){
    const side_comments = super_rich_text_ID.getElementsByClassName("side_comment");
    // if (this.deviceService.isMobile()) {
    //   console.log("site comments length: "+ side_comments.length);
    //   console.log("testing if mobile: " + this.deviceService.isMobile());
    // }
    // console.log("amount of comments-------<" +  side_comments.length);
    return side_comments;
  }
  



  mobile_side_comments(){
    let current_side_comment_id:any, current_side_comment:any;
    
    const side_comment_containers = document.getElementsByClassName("side_comment_container");
    for (var i = 0; i < side_comment_containers.length; i++) {
      let markdown_tag = side_comment_containers[i].getElementsByTagName("markdown")[0];
      let side_comments = side_comment_containers[i].getElementsByClassName("side_comment");
      let code_tags = markdown_tag.getElementsByTagName("code");
      
      for (var b = 0; b < side_comments.length; b++) {
        // ------ select side comment by ID
        let current_side_comment_id = side_comments[b].id;
        
        let current_side_comment = side_comments[b].innerHTML;
        // console.log("current b = " + b);
        // console.log("amount of side comments = " + side_comments.length);
        // console.log("current_side_comment_id" + current_side_comment_id);
        
        // side_comments[b].innerHTML = "";
        // code_tags[b].id = "code_tag-" + current_side_comment_id;
        
        // ------ copy the key word
        let current_keyword = code_tags[b].innerHTML;
        // ------ reconstruct the content of the code tag
        code_tags[b].innerHTML = current_keyword + "<div id='" + current_side_comment_id + "'>" + current_side_comment + "</div>";
        // ------ set display to 'none'
        document.getElementById(current_side_comment_id)!.style.display = "none";

        // ------ finally add Event Listener to key word
        code_tags[b].addEventListener('click', function (event) {
          // console.log("key word clicked.");
          if(document.getElementById(current_side_comment_id)!.style.display === "none"){
            document.getElementById(current_side_comment_id)!.style.display = "block";
          } else {
            document.getElementById(current_side_comment_id)!.style.display = "none";
          }
        });
      }
      side_comment_containers[i].getElementsByClassName("side_comments")[0].outerHTML = "";
    }
  }

}