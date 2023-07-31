import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@ngrx-research/ngrx/feature-todo/ngrx-entity-selector-routes').then(m => m.REMOVE_ENTITY_SELECTOR_ROUTES)
  },
  {
    path: 'signal-entity-store',
    loadChildren: () =>
      import('@ngrx-research/ngrx/feature-todo/signal-entity-store').then(m => m.SIGNAL_ENTITY_STORE_ROUTES)
  }
];
