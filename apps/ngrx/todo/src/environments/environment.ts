import { firebaseConfig } from '@secrets';
import { TodoEnvironmentModel } from '@ngrx-research/ngrx/domain';

export const environment: TodoEnvironmentModel = {
  production: false,
  development: true,
  uat: false,
  qa: false,
  firebaseConfig,
};
