import { Component, OnInit, AfterContentChecked } from '@angular/core';
//import * as QuestionGerman from './../json/question_german.ts';
//import { System } from 'systemjs';

//declare const SystemJS: System;
// SystemJS.set('@types/systemjs', SystemJS.newModule(angularCore));


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questionsDatabase = require("../../../assets/json/question_german.json");
  length_of_database = this.questionsDatabase.length - 1;
  pass_typewriter_content:any;

  timeToReloadNewText = 3000; // 3 seconds
  deloadSpeed = 60;
  // questionsDatabase = [
  //   // <?php echo $one_item["question"]; ?>
  //   "Aber was wäre, wenn wir die Uhr zurückdrehen könnten?",
  //   "Wie sollten Sie ein Produkt und eine darauf basierende Dienstleistung entwerfen?",
  //   "Wie können wir uns von den Glaubenssystemen der herrschenden Klassen zu denen der Mittelschichten bewegen?",
  //   "Welcher Zweck und welche Funktion hat ein Farbstoff?",
  //   "Wie können wir diesen Abgrund an Verschwendung vermeiden?",
  //   "Wie sollten Sie es schreiben?",
  //   "Warum schaffen wir ein neues Ideal?",
  //   "Sollten wir alle so töricht sein?",
  //   "Warum sollen wir glauben, dass die Bedingungen, die große Pandemie von 1918 verursachten?"
  // ];

  constructor() {
  }

  ngOnInit() {
    let i = Math.floor(Math.random() * this.length_of_database);
    this.StartTextAnimation(i);
    console.log("starting with number: " + i);
    
  }
  
    // types one text in the typewriter
    // keeps calling itself until the text is finished
    typeWriter(text:any, i:any, fnCallback:any) {
      // checks if the text isn't finished yet, and add next character
      if (i < (text.length)) {
        this.pass_typewriter_content = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        //document.getElementById("type-questions").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        // wait for a while and call this function again for the next character
        setTimeout( (typeWriter) => {
          this.typeWriter(text, i + 1, fnCallback);
        }, 100);
      }
      // when text is finished, call the callback function again
      else if (typeof fnCallback == 'function') {
        setTimeout( (deleteText) => {
          this.deleteText(text, i);
        }, this.timeToReloadNewText);
        // call callback after timeout
        setTimeout(fnCallback, this.deloadSpeed * (text.length) + this.timeToReloadNewText + 600);
      }
    }

    deleteText(text:any, i:any) {
      if (i <= (text.length) && i > 0) {
        this.pass_typewriter_content = text.substring(0, i - 1) + '<span aria-hidden="true"></span>';
        //document.getElementById("type-questions").innerHTML = text.substring(0, i - 1) + '<span aria-hidden="true"></span>';
        // wait for a while and call this function again for the next character
        setTimeout( (deleteText) => {
          this.deleteText(text, i - 1)
        }, this.deloadSpeed);
      }
    }

    // start animation for the text in the questionsDatabase array
    StartTextAnimation(i:any) {  
      console.log("start the questioning");
          
      if (typeof this.questionsDatabase[i].question == 'undefined') {
        setTimeout( (StartTextAnimation) => {
          console.log("is it undefined?");
          
          let c = Math.floor(Math.random() * this.length_of_database);
          this.StartTextAnimation(c);
        }, 2000);
      }
      // if questionsDatabase[i] exists, start animation
      if (this.questionsDatabase[i].question.length) {
        this.typeWriter(this.questionsDatabase[i].question, 0, () =>{
          let b = Math.floor(Math.random() * this.length_of_database);
          console.log("question number: " + b);
          console.log(this.questionsDatabase[b].question);
          
          
          this.StartTextAnimation(b);
        });
      }
    }

}