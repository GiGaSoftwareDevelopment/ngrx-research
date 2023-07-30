import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import * as TodoReducer from './todo.reducer';
import { Dictionary } from '@ngrx/entity';
import { Todo } from './todo.model';
import { MemoizedSelector } from '@ngrx/store/src/selector';

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

// START
export const selectCurrentTodoId = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.selectedTodoId
);


export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (entities, todoId) => todoId && entities[todoId]
);

// END

export const selectTodoLoadingInProgress = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.isLoading
);

export const selectDeletedTodos = () => {

  let currentEntities: Dictionary<Todo> = {}

  return createSelector(
    selectTodoEntities,
    (entities: Dictionary<Todo>): Todo[] => {

      const deletedEntities = Object.keys(currentEntities)
        .reduce((result: { [key: string]: Todo }, key: string) => {
          if (!entities[key] && currentEntities[key]) {
            result[key] = <Todo>currentEntities[key];
          }
          return result;
        }, {});

      currentEntities = {
        ...entities
      };

      return Object.values(deletedEntities
      );
    }
  );
}

