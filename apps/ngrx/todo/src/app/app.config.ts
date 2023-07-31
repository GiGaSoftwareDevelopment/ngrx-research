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
  localStorageReducer,
  NG_PAT_LOCAL_STORAGE_CONFIGURATION,
  ngPatIInitialLocalStorageState,
  ngPatLocalStoragesFeatureKey
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
        [ngPatLocalStoragesFeatureKey]: localStorageReducer,
      },
      {
        initialState: {
          [todosFeatureKey]: initialTodoState,
          [ngPatLocalStoragesFeatureKey]: ngPatIInitialLocalStorageState,
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
    provideHttpClient(),
  ]
};
