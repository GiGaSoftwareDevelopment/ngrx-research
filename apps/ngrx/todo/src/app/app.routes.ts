import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ngrx-entity-with-signals',
    loadChildren: () =>
      import('@ngrx-research/ngrx/feature-todo/ngrx-entity-selector-routes').then(m => m.REMOVE_ENTITY_SELECTOR_ROUTES)
  },
  {
    path: 'signal-entity-store',
    loadChildren: () =>
      import('@ngrx-research/ngrx/feature-todo/signal-entity-store').then(m => m.SIGNAL_ENTITY_STORE_ROUTES)
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
