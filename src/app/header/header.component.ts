import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  // language?:string;
  // subscription: Subscription | undefined;

  constructor(
    private currentLanguage: CurrentLanguageService,
  ) {}

  document : any;

  public ngOnInit()
  {
    // this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
    //   this.language = language;
    // });

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
