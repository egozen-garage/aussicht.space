import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkArtistHover'
})
export class CheckArtistHoverPipe implements PipeTransform {

  // transform(value: string, folder_name: string): string {
  //   return folder_name;
  // }
  transform(tempHoverArtist: any, args?: any): any {
    return tempHoverArtist[0];
  }

}
