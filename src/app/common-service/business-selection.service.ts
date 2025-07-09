import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusinessSelectionService {
  private selectedBusinessSubject = new BehaviorSubject<string | null>(localStorage.getItem('selectedBusiness'));
  selectedBusiness$ = this.selectedBusinessSubject.asObservable();

  setBusiness(business: string) {
    localStorage.setItem('selectedBusiness', business);
    this.selectedBusinessSubject.next(business);
  }

  clearBusiness() {
    localStorage.removeItem('selectedBusiness');
    this.selectedBusinessSubject.next(null);
  }

  getSelectedBusiness(): string | null {
    return this.selectedBusinessSubject.value;
  }
}
