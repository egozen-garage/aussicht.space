import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from "../services/helper.service";

@Pipe({
  name: 'title2link'
})
export class Title2linkPipe implements PipeTransform {

  constructor(private helperService: HelperService){}
  
  transform(value: string, ...args: unknown[]): unknown {
    let convertedTitle = this.helperService.encodeCustomURI(value);    
    return convertedTitle;
  }

}
