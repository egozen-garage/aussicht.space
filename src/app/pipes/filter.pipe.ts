import { Pipe, PipeTransform } from '@angular/core';
import { ProjectService } from '../services_strapi/project.service';
import { PerspectiveService } from '../services_strapi/perspective.service';
import { ThemeService } from '../services_strapi/theme.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], args?: any): any {
    return values;
    console.log("test");
  }

}
