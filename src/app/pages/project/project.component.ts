import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services_strapi/project.service';
import { ActivatedRoute } from '@angular/router';

//import { CustomDesignIframeComponent } from '../custom_designs/custom-design-iframe/custom-design-iframe.component';
//import { CustomDesignJavascriptComponent } from '../custom_designs/custom-design-javascript/custom-design-javascript.component';

// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectID : string = "";
  project:any;

  // key of object within the json file
  key = "name";
  image_size:number | undefined;
  image_size_STYLE:number | undefined;
  
  //folder_name = "arndt_armin";
  folder_name = "storch_annika";
  // folder_name = "bastian_castano_moreno";

  constructor(
    private projectSvc: ProjectService,
    private route: ActivatedRoute,
    ) { 
      if (window.innerWidth >= 1024) {
        //this.isMobileResolution = true;
        this.image_size = 64;
        this.image_size_STYLE = 64;
      } else if(window.innerWidth > 576 && window.innerWidth < 1024) {
        //this.isMobileResolution = false;
        this.image_size = 64;
        this.image_size_STYLE = 64;
      }else if(window.innerWidth <= 576){
        this.image_size = 32;
        this.image_size_STYLE = 32;
      }
    }

  ngOnInit() {
    // this.projectSvc.getAllProjects().subscribe((res:any) => {
    //   this.projects = res;
    // });
    console.log("project parent componant");
    

    this.route.params.subscribe( p => this.projectID = p['id'] );

    // this.project$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     const name = params.get('id');
    //     console.log("id name is:" + name);
    //     return this.projectSvc.getProject(name);
    //   })
    // );

    this.projectSvc.getProject(this.projectID).subscribe((res:any) => {
      this.project = res;
      return console.log("project data array: " + this.project );
    });

    this.single_project_load_gpt_images(this.folder_name)
  }



  // ----------------------- load gpt images -----------------------

  // resize_window(event:any){
  //   let window_size = event.target.innerWidth;
  //   // console.log("window resize: " + window_size);
  //   if (window_size >= 1024){
  //     this.image_size = 64;
  //     this.image_size_STYLE = 64;
  //   } else if(window_size > 576 && window_size < 1024) {
  //     this.image_size = 32;
  //     this.image_size_STYLE = 32;
  //   } else if(window_size <= 576){
  //     this.image_size = 32;
  //     this.image_size_STYLE = 16;
  //   }
  // }

  //loading_speed = 100;
  //deloading_speed = 90;
  randomNumber:number = 0;
  // maximum = 40;
  minimum = 0;
  // single_project_load_gpt_images(folder_name:string){
  single_project_load_gpt_images(folder_name:string){
    //random Number between 25 and 39
    const maximum = 60;
    console.log("max: " + maximum);
    
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
      img_tag.setAttribute("onerror", "this.onerror=null; this.src='/assets/imgs/image_gpt/white.png'");
      // 4. Append the img element to the div element
      image_gpt_container?.insertBefore(img_tag, image_gpt_container.childNodes[0]);
      //image_gpt_container?.appendChild(img_tag);
    });

    // set visibitity to visibile with delay
    var counter = 1;
    const loading_speed = 100;
    const time_until_start = 400;
    const image_gpt_container = Array.from(document.getElementById("gpt_images")!.getElementsByTagName('img'));
    const hover_image_gpt_container = document.getElementById("gpt_images");
    let hover:boolean = false;
    image_gpt_container.reverse().forEach( (file) => {
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

}
