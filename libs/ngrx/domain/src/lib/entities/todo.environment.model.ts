import { InjectionToken } from '@angular/core';
import { FirebaseConfig } from '@ngpat/firebase';

export interface TodoEnvironmentModel {
  production: boolean;
  development: boolean;
  uat: boolean;
  qa: boolean;
  firebaseConfig: FirebaseConfig;
}

export const TODO_ENVIRONMENT: InjectionToken<TodoEnvironmentModel> =
  new InjectionToken<TodoEnvironmentModel>('TODO_ENVIRONMENT');
