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
  events: any = [];
  eventId: any = [];
  eventsFromCms: any;
  eventsSelected: any = [];


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
      this.eventsFromCms = res;
      this.events = this.eventsFromCms;
    });
  }


  getSelected() {
    // 1. Determine the checked checkboxes
    // 1.a none or every checkbox is checked: No filter happens
    // 2. Read cms-events, then filter cms-events (related to checked checkboxes), then assign to events-variable
    // 3. angular repaints automatically
    this.eventsSelected = this.eventsFromCms.filter((event: any) => event.selected);
    console.log("eventsSelected" + this.eventsSelected);
    
    if (!this.eventsSelected.length) {
      console.log("eventsSelected: " + this.eventsSelected);
      console.log("eventsFromCms: " + this.eventsFromCms);
      
      this.eventsSelected = this.eventsFromCms;
    }

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