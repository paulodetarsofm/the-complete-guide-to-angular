import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated = false;

  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.userService
        .activated$
        .subscribe((isActivated: boolean) => this.userActivated = isActivated)
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
