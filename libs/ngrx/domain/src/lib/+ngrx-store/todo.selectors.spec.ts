import {Todo} from './todo.model';
import {TodoState} from './todo.ngPatAccountReducer';
import * as fromTodoReducer from './todo.ngPatAccountReducer';
import * as fromTodoSelectors from './todo.selectors';

describe('Todo Selectors', () => {
  let rootState: {[fromTodoReducer.todosFeatureKey]: TodoState};

  const todo1: Todo = {
    id: 'foo1'
  };

  const todo2: Todo = {
    id: 'foo2'
  };

  beforeEach(() => {
    rootState = {
      [fromTodoReducer.todosFeatureKey]: {
        ids: [todo1.id, todo2.id],
        entities: {
          [todo1.id]: todo1,
          [todo2.id]: todo2
        }
      }
    };
  });

  it('should selectAllTodos', () => {
    expect(fromTodoSelectors.selectAllTodos(rootState).length).toEqual(2);
  });

  it('should selectTodoEntities', () => {
    expect(fromTodoSelectors.selectTodoEntities(rootState)).toEqual(
      rootState[fromTodoReducer.todosFeatureKey].entities
    );
  });

  it('should selectTodoIds', () => {
    expect(fromTodoSelectors.selectTodoIds(rootState)).toEqual(
      rootState[fromTodoReducer.todosFeatureKey].ids
    );
  });

  it('should selectTodoTotal', () => {
    expect(fromTodoSelectors.selectTodoTotal(rootState)).toEqual(2);
  });
});
