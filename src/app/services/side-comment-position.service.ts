import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideCommentPositionService implements OnInit, AfterViewInit {
  resizeObservable$!: Observable<Event>;
  resizeSubscription$: Subscription = new Subscription;

  constructor() {
  }
  ngOnInit(): void { 
  }

  ngAfterViewInit(): void {
  }

  listenResizeWindow(){
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.scanMarkdowns();
      console.log('event: ', evt)
    }) 
  }

  // ----------------- create an array of all 'code' tags form STRAPI CMS -----------------
  
  scanMarkdowns(){
    // const markdown_tags = document.getElementsByTagName("markdown");
    // for (var i = 0; i < markdown_tags.length; i++) {
    //   console.log("markdown number: " + i);
    //   const markdown_counter = "markdown_nr_" + i;
    //   markdown_tags[i].setAttribute("id", markdown_counter);
    //   this.collect_code_tags(markdown_counter);
    //   this.collect_side_comments(markdown_counter);
    // }
    const super_rich_text = document.getElementsByClassName("super_rich_text");
    console.log("super_rich_text" + super_rich_text);
    
    for (var i = 0; i < super_rich_text.length; i++) {
      let markdown_tag = super_rich_text[i].getElementsByTagName("markdown")[0];
      let side_comments = this.collect_side_comments(super_rich_text[i]);
      

      console.log("super_rich_text length: " + i);
      const markdown_counter = "markdown_nr_" + i;
      markdown_tag.setAttribute("id", markdown_counter);
      this.collect_code_tags(markdown_tag, side_comments);
      
    }
  }

  // collect all code tags within specific markdown 
  // calculate height position and transfer it to a side comment
  collect_code_tags(markdown_ID:any, side_comments:any){
    let code_tag_position, side_comment_height, difference;
    var minus = 0;
    var blocked_space = 0;
    const code_tags = markdown_ID.getElementsByTagName("code");
    console.log("markdown_ID---> " + code_tags.length );
    for (var i = 0; i < code_tags.length; i++) {
      // console.log("####### nr: " + i);
      code_tag_position = this.calculate_position_of_code_tags(code_tags[i]);
      side_comment_height = side_comments[i].offsetHeight;
      
      // substract height of the previous comment
      let calculate_position = code_tag_position - minus;
      // set distance to top
      difference = blocked_space - calculate_position;
      
      // console.log("/comment height: " + side_comment_height);
      // console.log("/calculate_position: " + calculate_position);
      // console.log("/blocked_space: " + blocked_space);
      // console.log("/difference: " + difference);
      
      // Distance of last object (from top of COMMENT CONTAINER to bottom of COMMENT) 
      // if ( blocked_space < calculate_position ){
      if ( difference < 0 ){
        console.log("--> no problems");
        side_comments[i].style.top = calculate_position + "px";
        // difference = difference + calculate_position
      } else {
        console.log("--> push it down");
        side_comments[i].style.top = calculate_position + difference + 20 + "px";
      }

      // prepare for the following comment
      blocked_space = calculate_position;
      minus = minus + side_comment_height;
    } 
  }


  // add window resize function
  calculate_position_of_code_tags(code_tag_ID:any){
    const code_tag_position = code_tag_ID.offsetTop;
    return code_tag_position;
  }


  collect_side_comments(super_rich_text_ID:any){
    const side_comments = super_rich_text_ID.getElementsByClassName("side_comment");
    console.log("side_comments-------<" +  side_comments.length);
    return side_comments;

    for (var i = 0; i < side_comments.length; i++) {
      // side_comments[i].setAttribute("id", markdown_ID + "side_comment_" + i);
      // side_comments[i].setAttribute("class", "side_comments_" + markdown_ID);
      // console.log("content of side_comments #: " + side_comments[i].innerHTML);
    } 
  }
  
  renderCommentPosition(side_note_ID:any){
    // this.calculate_position_of_code_tags("markdown_nr_0code_tag_0");
    let distance_to_top = this.calculate_position_of_code_tags("markdown_nr_0code_tag_0");
    
    // substract sidenote height
    let side_comment_height = document.getElementById(side_note_ID)!.offsetHeight;
    
    //console.log("side height: "+ side_comment_height);
    
    distance_to_top = distance_to_top + side_comment_height;
    // const distance_to_top = 500;
    return distance_to_top;
  }
  
  
}



// 1. call markdown Array (change to call super_rich_text array)
// 2. for each super_rich_text array 
//       --> select markdown
//             --> collect code tags
//       --> collect footnotes

// 3. for each code tag
//       --> call height position
//               --> apply height to footnote