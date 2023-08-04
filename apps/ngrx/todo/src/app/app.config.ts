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
import { provideHttpClient } from '@angular/common/http';
import {
  NG_PAT_LOCAL_STORAGE_CONFIGURATION, provideLocalStorageEffects,
  provideLocalStorageInitialState,
  provideLocalStorageReducer
} from '@ngpat/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: TODO_ENVIRONMENT,
      useValue: environment
    },
    {
      provide: NG_PAT_LOCAL_STORAGE_CONFIGURATION,
      useValue: {
        enableEncryption: true,
        encryptionKey: 'foo', // for demo only
        excludeKeys: []
      },
    },
    provideAnimations(),
    provideStore({
        [todosFeatureKey]: todoReducer,
        ...provideLocalStorageReducer
      },
      {
        initialState: {
          [todosFeatureKey]: initialTodoState,
          ...provideLocalStorageInitialState
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
    provideEffects([ TodoEffects, ...provideLocalStorageEffects ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    provideHttpClient(),
  ]
};
