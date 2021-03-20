import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-custom-design-blank-html',
  templateUrl: './custom-design-blank-html.component.html',
  styleUrls: ['./custom-design-blank-html.component.scss']
})
export class CustomDesignBlankHTMLComponent implements OnInit {
  @Input() project:any;
  HTML_src: any;
  HTML_file: any;
  private myTemplate: any = "";
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    ) {
  }


  ngOnInit(): void {
    //this.HTML_src = this.sanitizer.bypassSecurityTrustHtml(require("/src/assets/custom_design_files/html_files/test.html"));

    //this.http.get(this.HTML_src).pipe(map((html:any) => this.HTML_file = html));


      // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(unsafeSrc);    
      
  }

}
