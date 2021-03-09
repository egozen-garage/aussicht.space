import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgxCsvParserModule } from 'ngx-csv-parser';


@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(
    private http: HttpClient, 
  ) { 
    this.getCooker();
  }
  
  ngOnInit(): void {
    // this.getCooker().subscribe(res => {
    //   this.productData = res
    //   this.productDataFilter = res
    //   console.log("google sheet output" + this.productData)
    // })
  }

  public getCooker(): Observable<any> {
    const sheetno="od6"
    const sheetid = "11Ai9cZgPjasCPZuarlnam7dLCPvY45LOZ29L29ELmmbU"
    const url = `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;

          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            data.forEach((entry:any) => {
              const obj:any = {};
              for (const x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              returnArray.push(obj);
            });
          }
          return returnArray;
        })
      );
  }




}
