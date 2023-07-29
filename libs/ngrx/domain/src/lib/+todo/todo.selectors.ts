import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as TodoReducer from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoReducer.TodoState>(
  TodoReducer.todosFeatureKey
);

const {selectIds, selectEntities, selectAll, selectTotal} =
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
