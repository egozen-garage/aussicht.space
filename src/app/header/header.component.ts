import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}







  
}

// ----------------------- EVENT LISTENER FOR HEADER ------------------------------

// // these are the elements (class or ID) that will be changed
// const itemprogramme = document.querySelector("#itemprogramme");
// const itemartists = document.querySelector("#itemartists");
// const itemabout = document.querySelector("#itemabout");

// // this is being watched by the observer
// const sectionOne = document.querySelector("#programme");
// const sectionTwo = document.querySelector("#artists");
// const sectionThree = document.querySelector("#about");

// availableSections = [
// {
//     id: "programme",
//     menuId: "itemprogramme"
// },
// {
//     id: "about",
//     menuId: "itemabout"
// },
// {
//     id: "artists",
//     menuId: "itemartists"
// }
// ];
// const elementsOffsets = {};

// activeSectionId = null;

// window.addEventListener("scroll", () => {
// availableSections.forEach((s) => {
// elementsOffsets[s.id] = document.querySelector(`#${s.id}`).offsetTop;
// });

// var sectionHit = availableSections
// .slice()
// .reverse()
// .some((section) => {
// if (window.pageYOffset + 10 >= elementsOffsets[section.id]) {
//   if (activeSectionId === section.id) {
//     return true;
//   }
//   console.log(section);
//   activeSectionId = section.id;
//   // Setzt in der URL den Section-Eintrag hinter dem Hashtag
//   window.history.pushState("", "", `#${section.id}`);
//   if (section.id === "programme") {
//     itemprogramme.classList.add("nav-scrolled");
//     itemartists.classList.remove("nav-scrolled");
//     itemabout.classList.remove("nav-scrolled");
//     return true;
//   }
//   if (section.id === "about") {
//     itemprogramme.classList.remove("nav-scrolled");
//     itemartists.classList.remove("nav-scrolled");
//     itemabout.classList.add("nav-scrolled");
//     return true;
//   }
//   if (section.id === "artists") {
//     itemprogramme.classList.remove("nav-scrolled");
//     itemartists.classList.add("nav-scrolled");
//     itemabout.classList.remove("nav-scrolled");
//     return true;
//   }
// }
// return false;
// });
// if (!sectionHit) {
// itemprogramme.classList.remove("nav-scrolled");
// itemartists.classList.remove("nav-scrolled");
// itemabout.classList.remove("nav-scrolled");
// activeSectionId = null;
// }
// });