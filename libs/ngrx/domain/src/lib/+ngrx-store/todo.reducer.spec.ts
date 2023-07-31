import {Update} from '@ngrx/entity/src/models';
import {Todo} from './todo.model';
import {
  ngPatAccountReducer,
  initialTodoState,
  TodoState
} from './todo.ngPatAccountReducer';
import * as TodoActions from './todo.actions';

describe('Todo Reducer', () => {
  it('should addTodo', () => {
    const todo: Todo = {
      id: 'foo'
    };

    const state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodo({todo})
    );

    expect(state.entities[todo.id]).toEqual(todo);
    expect(state.ids[0]).toEqual(todo.id);
  });

  it('should upsertTodo', () => {
    const todo: Todo = {
      id: 'foo'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodo({todo})
    );

    // TodoActions.upsertTodo
    //

    const upsert: Todo = {
      ...todo
    };

    state = ngPatAccountReducer(state, TodoActions.upsertTodo({todo: upsert}));

    expect(state.entities[todo.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(todo.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should addTodos', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    const state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodos({todos: [todo1, todo2]})
    );

    expect(state.entities[todo1.id]).toEqual(todo1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(todo2);
    expect((<string[]>state.ids).includes(todo2.id)).toBe(true);
  });

  it('should upsertTodos', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodos({todos: [todo1, todo2]})
    );

    // TodoActions.upsertTodos
    //

    const upsert1: Todo = {
      ...todo1
    };

    const upsert2: Todo = {
      ...todo2
    };

    state = ngPatAccountReducer(
      state,
      TodoActions.upsertTodos({todos: [upsert1, upsert2]})
    );

    expect(state.entities[todo1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should updateTodo', () => {
    const todo: Todo = {
      id: 'foo1'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodo({todo})
    );

    // updateTodo
    //
    const update: Todo = {
      id: 'foo1'
    };

    state = ngPatAccountReducer(
      state,
      TodoActions.updateTodo({
        todo: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[todo.id]).toEqual(update);
  });

  it('should updateTodos', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodos({todos: [todo1, todo2]})
    );

    // TodoActions.upsertTodos
    //

    const update1: Todo = {
      ...todo1
    };

    const update2: Todo = {
      ...todo2
    };

    const updatesPayload: Update<Todo>[] = [
      {
        id: update1.id,
        changes: update1
      },
      {
        id: update2.id,
        changes: update2
      }
    ];

    state = ngPatAccountReducer(
      state,
      TodoActions.updateTodos({todos: updatesPayload})
    );

    expect(state.entities[todo1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should deleteTodo', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodos({todos: [todo1, todo2]})
    );

    expect(state.entities[todo1.id]).toEqual(todo1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(todo2);
    expect((<string[]>state.ids).includes(todo2.id)).toBe(true);

    state = ngPatAccountReducer(state, TodoActions.deleteTodo({id: todo1.id}));

    expect(state.entities[todo1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(todo1.id)).toBe(false);

    expect(state.entities[todo2.id]).toEqual(todo2);
    expect((<string[]>state.ids).includes(todo2.id)).toBe(true);
  });

  it('should deleteTodos', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.addTodos({todos: [todo1, todo2]})
    );

    expect(state.entities[todo1.id]).toEqual(todo1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(todo2);
    expect((<string[]>state.ids).includes(todo2.id)).toBe(true);

    state = ngPatAccountReducer(
      state,
      TodoActions.deleteTodos({ids: [todo1.id, todo2.id]})
    );

    expect(state.entities[todo1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(todo1.id)).toBe(false);

    expect(state.entities[todo2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(todo2.id)).toBe(false);
  });

  it('should loadTodos', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    const state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.loadTodos({todos: [todo1, todo2]})
    );

    expect(state.entities[todo1.id]).toEqual(todo1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(todo2);
    expect((<string[]>state.ids).includes(todo2.id)).toBe(true);
  });

  it('should clearTodos', () => {
    const todo1: Todo = {
      id: 'foo1'
    };

    const todo2: Todo = {
      id: 'foo2'
    };

    let state: TodoState = ngPatAccountReducer(
      initialTodoState,
      TodoActions.loadTodos({todos: [todo1, todo2]})
    );

    expect(state.entities[todo1.id]).toEqual(todo1);
    expect((<string[]>state.ids).includes(todo1.id)).toBe(true);

    expect(state.entities[todo2.id]).toEqual(todo2);
    expect((<string[]>state.ids).includes(todo2.id)).toBe(true);

    // clearTodos
    //
    state = ngPatAccountReducer(state, TodoActions.clearTodos());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
