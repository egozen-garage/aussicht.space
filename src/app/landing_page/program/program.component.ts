import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { environment } from '../../../environments/environment';
import { Character, characterAttributesMapping } from './character.model';
import { EventService } from '../../services_strapi/event.service';



// import { SheetService } from "../../services/sheet.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  apiUrl = environment.apiUrl;

  language: any = "de";

  events: any = [];
  eventId: any = [];
  eventsFromCms: any;
  eventsSelected: any = [];

  performances: any = [];
  event_performances:any = [];
  talks: any = [];
  event_talks:any = [];
  specials: any = [];
  event_specials:any = [];

  characters$?: Observable<Character[]>;

  //sheetno = "od6";
  //sheetid = "11Ai9cZgPjasCPZuarlnam7dLCPvY45LOZ29L29ELmmbU";
  // characters$: Observable<any[]> | undefined ;

  constructor(
    private eventSvc: EventService,
    ) { 
  }

  ngOnInit(): void {
    this.eventSvc.getAllEvents().subscribe((res:any) => {      
      this.events = res;
      this.eventsFromCms = this.events;

      // sort events by categories
      this.events.forEach((element:any) => {
        if (element.category === "performance" ){
          this.performances.push(element);
          // sort this category by timestamp
          this.performances.sort((x:any, y:any) => new Date(x.timestamp).valueOf() - new Date(y.timestamp).valueOf() );
        }else if(element.category === "talk" ){
          this.talks.push(element);
          // sort this category by timestamp
          this.talks.sort((x:any, y:any) => new Date(x.timestamp).valueOf() - new Date(y.timestamp).valueOf() );
        }else if(element.category === "special" ){
          this.specials.push(element);
          // sort this category by timestamp
          this.specials.sort((x:any, y:any) => new Date(x.timestamp).valueOf() - new Date(y.timestamp).valueOf() );
        }
      });

      console.log("this.specials" + this.specials);
      if (this.language === "de"){
        this.performances.forEach((element:any) => {  this.event_performances.push(element.de);   });
        this.talks.forEach((element:any)        => {  this.event_talks.push(element.de);          });
        this.specials.forEach((element:any)     => {  this.event_specials.push(element.de);       });
      } else if (this.language === "en"){
        this.performances.forEach((element:any) => {  this.event_performances.push(element.en);   });
        this.talks.forEach((element:any)        => {  this.event_talks.push(element.en);          });
        this.specials.forEach((element:any)     => {  this.event_specials.push(element.en);       });
      }
      
      
    });
  }

  showHideInfo(event_info_id:any){
    let collapsible_info = document.getElementById("collapsible_info_" + event_info_id);
    let animate_br = document.getElementById("animate_br_" + event_info_id);
    let checkbox = document.getElementById("checkbox_" + event_info_id) as HTMLInputElement;
    if ( checkbox!.checked ){
      animate_br!.classList.remove("checked_element_break");
      collapsible_info!.classList.remove("checked_element");
    } else {
      animate_br!.classList.add("checked_element_break");
      collapsible_info!.classList.add("checked_element");
    }


  }


  getSelected() {
              // 1. Determine the checked checkboxes
              // 1.a none or every checkbox is checked: No filter happens
              // 2. Read cms-events, then filter cms-events (related to checked checkboxes), then assign to events-variable
              // 3. angular repaints automatically
    // this.eventsSelected = this.eventsFromCms.filter((event: any) => event.selected);
    // console.log("eventsSelected" + this.eventsSelected);
    
    // if (!this.eventsSelected.length) {
    //   console.log("before eventsSelected: " + this.eventsSelected);      
    //   this.eventsSelected = this.eventsFromCms;
    //   console.log("after eventsSelected: " + this.eventsSelected);
    // }

              // calls out the selected state of current events
              // seems to only call out values from the parent array perspectives...maybe not correct
              // this.updateevents();

              // this.events = this.events.filter((unit:any) => {
                // this looks for the boolean value inside the API array [unit [ {themes.selected}, {...} ] ]
              //   return unit.themes.some((themeOfUnit: any) => {
              //     return this.eventsSelected.some((selectedTheme: any) => selectedTheme.theme_name === themeOfUnit.theme_name);
              //   });
              // });
  }

}