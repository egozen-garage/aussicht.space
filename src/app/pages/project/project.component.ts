import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services_strapi/project.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SideCommentPositionService } from '../../services/side-comment-position.service';
import { HelperService } from "../../services/helper.service";


//import { CustomDesignIframeComponent } from '../custom_designs/custom-design-iframe/custom-design-iframe.component';
//import { CustomDesignJavascriptComponent } from '../custom_designs/custom-design-javascript/custom-design-javascript.component';

// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  projectID : string = "";
  private projectTitle: string = "";
  project:any;
  folder_name:any;

  // // current_project:number | undefined;
  // previous_project:number = -1;
  // next_project:number = 1;

  // @Output() EVENTafterPageLoad = new EventEmitter();

  // key of object within the json file
  key = "name";
  image_size:number = 64;
  image_size_STYLE:number = 64;


  constructor(
    private projectSvc: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    // private sideCommentPosition: SideCommentPositionService,
    private sideCommentPosition: SideCommentPositionService    
    ) {       
      if (window.innerWidth >= 1024) {
        //this.isMobileResolution = true;
        this.image_size = 128;
        this.image_size_STYLE = 128;
      } else if(window.innerWidth > 576 && window.innerWidth < 1024) {
        //this.isMobileResolution = false;
        this.image_size = 64;
        this.image_size_STYLE = 64;
      }else if(window.innerWidth <= 576){
        this.image_size = 64;
        this.image_size_STYLE = 64;
      }
      // this.EVENTafterPageLoad.emit();
    }
    
  ngAfterViewInit(): void {
    this.sideCommentPosition.run_side_comments();
    // this.activate_site_comments(this.sideCommentPosition);
    // this.sideCommentPosition.listenResizeWindow();
  }

  // activate_site_comments(site_comment_service:any){
  //   setTimeout(() =>{ 
  //     site_comment_service.scanMarkdowns();
  //     const side_comments = Array.from(document.getElementsByClassName('side_comment') as HTMLCollectionOf<HTMLElement>)
  //     side_comments.forEach(item => {
  //       item.style.opacity = "1";
  //       item.classList.add("fade-in");
  //     });
  //   }, 1000);
  // }

  toggleCuratorialContent(){
    var x = document.getElementById("collapsibleButton");
    var icon = x!.querySelector('.icon');
    icon!.classList.toggle('show-more');
  }


  // side_comment_ID:any
  callPosition(side_note_ID:any){
    //console.log("side note id: " + side_note_ID);
    //console.log("call the position of the code tag");
    // return this.sideCommentPosition.renderCommentPosition(side_note_ID);
  }

  ngOnInit() {
    // this.EVENTafterPageLoad.emit();

    console.log("project parent componant");
    // this.projectSvc.getAllProjects().subscribe((res:any) => {
      //   this.projects = res;
      // });

    this.route.params.subscribe( p => {
      this.projectTitle = p['title'];
      this.projectSvc.getAllProjects().subscribe((allProjects:any[]) => {
        for (let i=0; i<allProjects.length; i++) {
          let project = allProjects[i];
          if (this.helperService.encodeCustomURI(project.title) == this.projectTitle) {
            this.project = project;

            console.log("project url" + this.project);
            

            this.folder_name = this.project.GPT_folder_name;
            if(this.folder_name){
              this.single_project_load_gpt_images(this.folder_name)
            }
    //         let current_project = this.project.id;
    //         this.previous_project = this.previous_project + current_project;
    //         this.next_project = this.next_project + current_project;
    //         console.log("current project: " + current_project );
    //         console.log("previous project: " + this.previous_project );
    //         console.log("next project: " + this.next_project );
    //         // console.log("amount of projects: " + allProjectsCachedObservable.length);

            return console.log("project data array: " + this.project );
          }
        }
      });
    });

      // this.project$ = this.route.paramMap.pipe(
        //   switchMap(params => {
          //     const name = params.get('id');
          //     console.log("id name is:" + name);
          //     return this.projectSvc.getProject(name);
          //   })
          // );
          




      // this.projectSvc.getProject(this.projectID).subscribe((res:any) => {
      //   this.project = res;

      //   this.folder_name = this.project.GPT_folder_name;
      //   if(this.folder_name){
      //     this.single_project_load_gpt_images(this.folder_name)
      //   }
      //   let current_project = this.project.id;
      //   this.previous_project = this.previous_project + current_project;
      //   this.next_project = this.next_project + current_project;

      //   console.log("current project: " + current_project );
      //   console.log("previous project: " + this.previous_project );
      //   console.log("next project: " + this.next_project );
      //   // console.log("amount of projects: " + allProjectsCachedObservable.length);
        

      //   return console.log("project data array: " + this.project );
      // });





      // load gpt images 
      // this.folder_name = "bianchini_beatrice";
  }




// ----------------------- load gpt images -----------------------
  //loading_speed = 100;
  //deloading_speed = 90;
  randomNumber:number = 0;
  // maximum = 40;
  minimum = 0;
  single_project_load_gpt_images(folder_name:string){


    const maximum = 60;

    //let cancelled = false;
    // calculate the amount of images needed to cover the whole name
    // const amount_of_images = Math.round( (artist_name.length + artist_forename.length) / 2);
    const amount_of_images = maximum;
    // build the directory folder path
    const ImageDirectory = ("/assets/imgs/image_gpt/" + folder_name + "/generated/" + this.image_size + "/" + this.image_size + "_" + folder_name + "_");

    //create array of image paths
    let ImagePath_array = [];
    for (let i = 0; i < amount_of_images; i++){
      // let randomnumber = Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
      let ImagePath = ImageDirectory + i + ".png";
      ImagePath_array.push(ImagePath);
    }

    // shuffel array
    this.shuffle(ImagePath_array);

    // call array of image paths and add an image for each object
    ImagePath_array.forEach(function (file) {
      // 1. Select the div element using the id property
      const image_gpt_container = document.getElementById("gpt_images");
      // 2. Create a new <img> element programmatically
      const img_tag = document.createElement("img");
      // 3. Add the path to src
      img_tag.src = file;
      img_tag.setAttribute("style", "display:none;");
      // img_tag.setAttribute("onerror", "this.onerror=null; this.src='/assets/imgs/image_gpt/image_processing.gif'");
      img_tag.setAttribute("onerror", "this.onerror=null; this.src='/assets/imgs/image_gpt/empty.png'");
      // 4. Append the img element to the div element
      // image_gpt_container?.insertBefore(img_tag, image_gpt_container.childNodes[0]);
      image_gpt_container?.append(img_tag);
      //image_gpt_container?.appendChild(img_tag);
    });

    // set visibitity to visibile with delay
    var counter = 1;
    const loading_speed = 100;
    const time_until_start = 400;
    const image_gpt_container = Array.from(document.getElementById("gpt_images")!.getElementsByTagName('img'));
    const hover_image_gpt_container = document.getElementById("gpt_images");
    let hover:boolean = false;
    // image_gpt_container.reverse().forEach( (file) => {
    image_gpt_container.forEach( (file) => {

    file.classList.add("single-img");

      setTimeout( () => {
        // add: check if mouse hover container --> if yes: add image --> if no: abort
        file.setAttribute('style', 'display:inline-block; padding: 10px; height:' + this.image_size_STYLE + 'px; width: auto;')
      }, time_until_start + (counter * loading_speed));

      counter = counter +1;
    });
  }






  shuffle(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



  titleEncoded:string | undefined;
  title2url(unit_type:string, relatedTitle:string){
    console.log("$$$$$$$$");
    this.titleEncoded = this.helperService.encodeCustomURI(relatedTitle);
    this.router.navigate(['units', unit_type, this.titleEncoded]);
  }

}
