import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  initialTodoState,
  TODO_ENVIRONMENT,
  TodoEffects,
  todoReducer,
  todosFeatureKey
} from '@ngrx-research/ngrx/domain';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: TODO_ENVIRONMENT,
      useValue: environment
    },
    provideAnimations(),
    provideStore({
        [todosFeatureKey]: todoReducer
      },
      {
        initialState: {
          [todosFeatureKey]: initialTodoState
        },
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true
        }
      }
    ),
    provideEffects([ TodoEffects ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
  ]
};
