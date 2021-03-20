import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-design-javascript',
  templateUrl: './custom-design-javascript.component.html',
  styleUrls: ['./custom-design-javascript.component.scss']
})
export class CustomDesignJavascriptComponent implements OnInit {
  @Input() project:any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const javascript_file_name = this.project.addon.javascript_file_name
    const javascript_src = this.sanitizer.bypassSecurityTrustScript(require("/src/assets/custom_design_files/js_files/" + javascript_file_name));
  }

}
