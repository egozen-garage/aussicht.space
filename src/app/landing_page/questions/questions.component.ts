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
  timeToReloadNewText = 10000; // 10 seconds
  dataText = [
      // <?php echo $one_item["question"]; ?>
      "Aber was wäre, wenn wir die Uhr zurückdrehen könnten?",
      "Wie sollten Sie ein Produkt und eine darauf basierende Dienstleistung entwerfen?",
      "Wie können wir uns von den Glaubenssystemen der herrschenden Klassen zu denen der Mittelschichten bewegen?",
      "Welcher Zweck und welche Funktion hat ein Farbstoff?",
      "Wie können wir diesen Abgrund an Verschwendung vermeiden?",
      "Wie sollten Sie es schreiben?",
      "Warum schaffen wir ein neues Ideal?",
      "Sollten wir alle so töricht sein?",
      "Warum sollen wir glauben, dass die Bedingungen, die große Pandemie von 1918 verursachten?"
  ];

  constructor() { 
    console.log('Reading local json files');
    // console.log(QuestionGerman);
    // System.import('/assets/js/question_typewriter.js').then((loadQuestionsTypewriter:any) => {
    //   loadQuestionsTypewriter.typewriterSript();
  }

  ngOnInit(): void {
    // console.log("page loaded");
    // typewriterSript();
  }




}