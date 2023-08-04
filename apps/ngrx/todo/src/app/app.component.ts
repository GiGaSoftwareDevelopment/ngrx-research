import { Component, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { Capacitor } from '@capacitor/core';
import { NgPatSidenavData, NgPatSidenavMenuFactoryService, NgPatSidenavMenuModule } from '@ngpat/material/sidenav-menu';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  standalone: true,
  imports: [ RouterModule, MatSidenavModule, NgPatSidenavMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule  ],
  selector: 'ngrx-research-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

  sidenavData: NgPatSidenavData = {
    home: {
      title: 'Home',
      route: [ '/' ],
      icon: 'home'
    },
    currentTitle: 'Shortcuts',
    menuTitle: 'Research',
    menuGroupItems: [
      {
        title: 'NgRx',
        items: [
          {
            title: 'NgRx Entity with Signals',
            route: [ 'ngrx-entity-with-signals' ],
            icon: 'table_rows'
          },
          {
            route: [ 'signal-entity-store' ],
            title: 'Signal Entity Store',
            icon: 'storage'
          }
        ]
      }
    ]
  };

  get isIOS() {
    return Capacitor.getPlatform() === 'ios';
  }

  menuID = 'ngrxResearch';
  sideNavSvc = this.sideNavFactory.getService(this.menuID);

  mode: Signal<MatDrawerMode> = toSignal(this.sideNavSvc.mode$, { initialValue: 'side' });
  opened = toSignal(this.sideNavSvc.opened$, { initialValue: true });
  expandedWidth = toSignal(this.sideNavSvc.expandedWidth$, { initialValue: 0 });
  showNavBarOpenButton = toSignal(this.sideNavSvc.showNavBarOpenButton$, { initialValue: true });

  constructor(public sideNavFactory: NgPatSidenavMenuFactoryService) {
    this.sideNavSvc.init();
  }

  openSideNav() {
    this.sideNavSvc.setIsOpen(true);
  }

}
