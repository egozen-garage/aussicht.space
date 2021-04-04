import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public encodeCustomURI(text: string) {
    let textWithReplacedSpecialCharacters = text
      .replace(/ /g, "-")
      .replace(/[\.,!\?]/g, "")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/Ä/g, "Ae")
      .replace(/Ö/g, "Oe")
      .replace(/Ü/g, "Ue");
    return encodeURIComponent(textWithReplacedSpecialCharacters);
  }
}
