import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  ngOnInit() {
    const customIntervalObservable = new Observable((observer: Subscriber<unknown>) => {
      let count = 0;

      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error('Count is greater than 3!');
        }

        count++;
      }, 1000);
    });

    this.subscriptions.add(
      customIntervalObservable
        .pipe(
          filter((data: number) => data > 0),
          map((data: number) => {
            return `Round: ${data + 1}`;
          })
        )
        .subscribe(
          (data: string) => console.log(data),
          (error: any) => console.error(error),
          () => console.warn('Completed!')
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
