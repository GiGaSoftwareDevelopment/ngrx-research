import { firebaseConfig } from '@secrets';
import { TodoEnvironmentModel } from '@ngrx-research/ngrx/domain';

export const environment: TodoEnvironmentModel = {
  production: true,
  development: false,
  uat: false,
  qa: false,
  firebaseConfig,
};
