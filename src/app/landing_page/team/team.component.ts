import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  tmembers = require("../../../assets/json/team-members_list.json").sort();
  key = "name";

  constructor() { this.sortByKey(this.tmembers, this.key) }

  sortByKey(tmembers:any, key:any) {
    return tmembers.sort(function(a: { [x: string]: any; }, b: { [x: string]: any; }) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  ngOnInit(): void {
  }


}
