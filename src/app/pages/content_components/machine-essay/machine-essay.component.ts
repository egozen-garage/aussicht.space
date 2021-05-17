import { Component, Input, OnInit } from '@angular/core';
import { CurrentLanguageService } from '../../../services_strapi/language/current-language.service';


@Component({
  selector: 'app-machine-essay',
  templateUrl: './machine-essay.component.html',
  styleUrls: ['./machine-essay.component.scss']
})
export class MachineEssayComponent implements OnInit {

  @Input() body:any;
  randomMachineTextIndex: any;
  pass_machineGenerated_content:any;
  pass_machineGenerated_question:any;

  pass_machineGenerated_bundle_01: any;
  pass_machineGenerated_bundle_02: any;
  pass_machineGenerated_bundle_03: any;
  machineTextDatabase: any;
  machineTextIndex: any;

  language:string | undefined ;
  language_prefix:string|undefined;
  language_equivalent_page:string | undefined;

  constructor(
    private currentLanguage: CurrentLanguageService,
  ) { }

  ngOnInit(): void {    
    this.machineTextDatabase = this.body.json_data;
    this.machineTextIndex = this.machineTextDatabase.length - 1;

    let i = Math.floor(Math.random() * this.machineTextIndex);
    let a = Math.floor(Math.random() * this.machineTextIndex);
    let b = Math.floor(Math.random() * this.machineTextIndex);
    let c = Math.floor(Math.random() * this.machineTextIndex);

    var wordCounta = this.machineTextDatabase[a].generated;
    var wordCountb = this.machineTextDatabase[b].generated;
    var wordCountc = this.machineTextDatabase[c].generated;
    
    this.pass_machineGenerated_content = this.machineTextDatabase[i].generated;
    this.pass_machineGenerated_question = this.machineTextDatabase[i].input_str;

    this.pass_machineGenerated_bundle_01 = wordCounta.substring(0,100);
    this.pass_machineGenerated_bundle_02 = wordCountb.substring(0,400);
    this.pass_machineGenerated_bundle_03 = wordCountc.substring(0,700);
  }
  

  generateText(){
    var load = document.getElementById("loader");
    var arrow = document.getElementById("arrow");

    var readText = document.getElementById("machineText");
    var readQuestion = document.getElementById("machineQuestion");

    this.machineTextDatabase = this.body.json_data;
    this.machineTextIndex = this.machineTextDatabase.length - 1;

    let i = Math.floor(Math.random() * this.machineTextIndex);
    let a = Math.floor(Math.random() * this.machineTextIndex);
    let b = Math.floor(Math.random() * this.machineTextIndex);
    let c = Math.floor(Math.random() * this.machineTextIndex);

    var wordCounta = this.machineTextDatabase[a].generated;
    var wordCountb = this.machineTextDatabase[b].generated;
    var wordCountc = this.machineTextDatabase[c].generated;

    arrow!.style.display = "none";
    load!.style.display = "inline-block";
    
    setTimeout(()=>{
        readText!.classList.add("animate" , "fadeIn" , "one");
        readQuestion!.classList.add("animate" , "fadeIn" , "two");
        this.pass_machineGenerated_content = this.machineTextDatabase[i].generated;
        this.pass_machineGenerated_question = this.machineTextDatabase[i].input_str;
    
        this.pass_machineGenerated_bundle_01 = wordCounta.substring(0,100);
        this.pass_machineGenerated_bundle_02 = wordCountb.substring(0,400);
        this.pass_machineGenerated_bundle_03 = wordCountc.substring(0,700);

        load!.style.display = "none";
        arrow!.style.display = "inline-block";
    }, 500)

    readText!.classList.remove("animate" , "fadeIn" , "one");
    readQuestion!.classList.remove("animate" , "fadeIn" , "two");

  }

  generateTextBundle() {

  }



}
