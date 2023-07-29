import { firebaseConfig } from '@secrets';
import { TodoEnvironmentModel } from '@ngrx-research/ngrx/domain';

export const environment: TodoEnvironmentModel = {
  production: false,
  development: false,
  uat: true,
  qa: false,
  firebaseConfig,
};
