import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { environment } from '../../../environments/environment';
import { Character, characterAttributesMapping } from './character.model';


// import { SheetService } from "../../services/sheet.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  characters$?: Observable<Character[]>;

  //sheetno = "od6";
  //sheetid = "11Ai9cZgPjasCPZuarlnam7dLCPvY45LOZ29L29ELmmbU";
  // characters$: Observable<any[]> | undefined ;

  constructor(
    private googleSheetsDbService: GoogleSheetsDbService,
    ) { 
  }

  ngOnInit(): void {
    this.characters$ = this.googleSheetsDbService.getActive<Character>(
      environment.characters.spreadsheetId, environment.characters.worksheetId, characterAttributesMapping, 'Active');
  
  
    console.log("google output: " + this.characters$);  
  }



}