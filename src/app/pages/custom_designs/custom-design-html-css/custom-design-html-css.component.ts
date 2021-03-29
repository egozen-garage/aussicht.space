import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-design-html-css',
  templateUrl: './custom-design-html-css.component.html',
  styleUrls: ['./custom-design-html-css.component.scss']
})
export class CustomDesignHtmlCssComponent implements OnInit {
  @Input() project:any;
  html_code_save:any;
  
  constructor(private sanitizer: DomSanitizer,) {}

  ngOnInit(): void {
    const html_code = this.project;
    this.html_code_save = this.sanitizer.bypassSecurityTrustHtml(html_code);
  }
}