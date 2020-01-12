import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class UserService {

  private activatedSubject = new Subject<boolean>();
  activated$: Observable<boolean> = this.activatedSubject.asObservable();

  activate(): void {
    this.activatedSubject.next(true);
  }
}
