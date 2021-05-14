import { Component, HostListener, OnInit } from '@angular/core';
import { AnyMxRecord } from 'dns';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  language:string | undefined ;
  subscription: Subscription | undefined;
  index:any;
  program:any;
  about:any;
  participants:any;

  constructor(
    private currentLanguage: CurrentLanguageService,
    ) { 
    this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      if( language === "de"){
        this.index = "Index";
        this.program = "Programm";
        this.about = "Über";
        this.participants = "Teilnehmer:innen";
      } else if (language === "en") {
        this.index = "Index";
        this.program = "Programme";
        this.about = "About";
        this.participants = "Participants";
      } else {
        this.index = "Index";
        this.program = "Programme";
        this.about = "About";
        this.participants = "Participants";
      }
    });
  }

  document : any;

  public ngOnInit(){
    this.currentLanguage.currentLanguage.subscribe(res => {
      this.language = res;
    });

    jQuery(function(){
      $( '.menu-icon' ).click(function(){
        $('.overlay').toggleClass('open');            
      });  
      $('.overlay').click(function(){
        $('.menu-icon').trigger('click');
      });
    });
  }
}
