import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import * as TodoReducer from './todo.reducer';
import { Dictionary } from '@ngrx/entity';
import { Todo } from './todo.model';
import { MemoizedSelector } from '@ngrx/store/src/selector';
import { Result } from 'postcss';

export const selectTodoState = createFeatureSelector<TodoReducer.TodoState>(
  TodoReducer.todosFeatureKey
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  TodoReducer.todoAdapter.getSelectors();

export const selectAllTodos = createSelector(selectTodoState, selectAll);
export const selectTodoEntities = createSelector(
  selectTodoState,
  selectEntities
);
export const selectTodoIds = createSelector(selectTodoState, selectIds);
export const selectTodoTotal = createSelector(selectTodoState, selectTotal);

export const selectTodoLoadingInProgress = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.isLoading
);

export const selectNgPatDeletedEntities = <T>(entitySelector: MemoizedSelector<any, any>) => {

  let previousEntities: Dictionary<T> = {}

  return createSelector(
    entitySelector,
    (entities: Dictionary<T>): T[] => {

      const remainingEntities = Object.keys(previousEntities)
        .reduce((result: { [key: string]: T }, key: string) => {
          if (!entities[key] && previousEntities[key]) {
            result[key] = <T>previousEntities[key];
          }
          return result;
        }, {});

      previousEntities = {
        ...entities
      };

      return Object.values(remainingEntities);
    }
  );
}
