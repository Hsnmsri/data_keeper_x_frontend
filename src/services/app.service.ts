import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private sideMenuVisibility = new BehaviorSubject<boolean>(true);

  toggleSideMenu() {
    this.sideMenuVisibility.next(!this.sideMenuVisibility.value);
  }

  getSideMenuVisibility() {
    return this.sideMenuVisibility.asObservable();
  }
}
