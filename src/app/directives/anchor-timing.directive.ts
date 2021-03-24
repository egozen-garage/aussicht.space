import { Directive, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appAnchorTiming]'
})
export class AnchorTimingDirective implements AfterViewInit{

  private fragment: string | undefined;
  constructor(private route: ActivatedRoute) {
    // be sure the navigation goes to the # fragment
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    try {
      const anchor = document.querySelector<HTMLAnchorElement>('#' + this.fragment);
      anchor?.focus();
      anchor?.scrollIntoView();
    } catch (e) { }
  }

}
