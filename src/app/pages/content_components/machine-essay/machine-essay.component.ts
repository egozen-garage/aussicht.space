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
  machineTextDatabase: any;
  machineTextIndex: any;

  constructor() { }

  ngOnInit(): void {    
    this.machineTextDatabase = this.body.json_data;
    this.machineTextIndex = this.machineTextDatabase.length - 1;
    this.randomMachineTextIndex = Math.floor(Math.random() * this.machineTextIndex);

    let i = Math.floor(Math.random() * this.machineTextIndex);
    this.machineTextDatabase[i].generated
    
    this.pass_machineGenerated_content = this.machineTextDatabase[i].generated;
  }

  generateText(){
    this.machineTextDatabase = this.body.json_data;
    this.machineTextIndex = this.machineTextDatabase.length - 1;
    this.randomMachineTextIndex = Math.floor(Math.random() * this.machineTextIndex);

    let i = Math.floor(Math.random() * this.machineTextIndex);
    this.machineTextDatabase[i].generated
    
    this.pass_machineGenerated_content = this.machineTextDatabase[i].generated;
  }

}
