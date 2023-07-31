import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTodoParams, Todo, TodoForm } from './todo.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllTodos, selectDeletedTodos } from './todo.selectors';
import { createTodo, deleteTodo } from './todo.actions';



@Injectable({
  providedIn: 'root'
})
export class TodoSignalsFacade {

  /**
   * NgRx store as a Signal
   */
  todos: Signal<Todo[]> = toSignal(this.store.select(selectAllTodos), {
    initialValue: []
  });

  /**
   * NgRx store as a Signal
   */
  deletedTodos: Signal<Todo[]> = toSignal(this.store.select(selectDeletedTodos()), {
    initialValue: []
  });

    constructor(private store: Store) { }

  addTodo(todoForm: TodoForm) {
    this.store.dispatch(createTodo({
      todo: createTodoParams(todoForm)
    }))
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(deleteTodo({
      id: todo.id
    }));
  }

}
