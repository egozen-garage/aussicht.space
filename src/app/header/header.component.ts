import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  public ngOnInit()
  {
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
