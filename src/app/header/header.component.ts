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

  language:string | undefined ;
  // subscription: Subscription | undefined;

  constructor(
    private currentLanguage: CurrentLanguageService,
  ) {}

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
