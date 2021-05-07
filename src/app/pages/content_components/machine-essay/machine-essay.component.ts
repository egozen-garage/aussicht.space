import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

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

    this.pass_machineGenerated_bundle_01 = wordCounta.substring(0,500);
    this.pass_machineGenerated_bundle_02 = wordCountb.substring(0,800);
    this.pass_machineGenerated_bundle_03 = wordCountc.substring(0,1000);
  }
  

  generateText(){
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

    this.pass_machineGenerated_bundle_01 = wordCounta.substring(0,500);
    this.pass_machineGenerated_bundle_02 = wordCountb.substring(0,800);
    this.pass_machineGenerated_bundle_03 = wordCountc.substring(0,1000);
  }

  generateTextBundle() {

  }



}
