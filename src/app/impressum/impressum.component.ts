import { Component, OnInit } from '@angular/core';
import { ImpressumService } from '../services_strapi/impressum.service';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit {
  impressum: any = [];


  constructor(
    private impressumSvc: ImpressumService,
  ) { }

  ngOnInit(): void {
    this.impressumSvc.getAllOfImpressum().subscribe((res:any) => {
      this.impressum = res;
    });
  }

}
