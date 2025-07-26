import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  constructor(private http: HttpClient) { }

  translate(text: string, target: string): Observable<any> {
    // Use LibreTranslate API, or replace with your preferred service
    return this.http.post('https://libretranslate.de/translate', {
      q: text,
      source: 'auto',
      target: target,
      format: 'text'
    });
  }
}
