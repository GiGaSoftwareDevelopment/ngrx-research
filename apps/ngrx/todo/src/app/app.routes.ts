import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@ngrx-research/ngrx/feature-todo/ngrx-entity-selector-routes').then(m => m.REMOVE_ENTITY_SELECTOR_ROUTES)
  }
];
