import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Capacitor } from '@capacitor/core';

@Component({
  standalone: true,
  imports: [ RouterModule, MatSidenavModule ],
  selector: 'ngrx-research-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  get isIOS() {
    return Capacitor.getPlatform() === 'ios';
  }

  title = 'ngrx-todo';
}
