import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTodoParams, Todo, TodoForm } from './todo.model';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllTodos, selectCurrentTodo,
  selectDeletedTodos,
  selectIsFirstTodoSelected,
  selectIsLastTodoSelected
} from './todo.selectors';
import { createTodo, deleteTodo, nextTodo, previousTodo } from './todo.actions';



@Injectable({
  providedIn: 'root'
})
export class TodoSignalsFacade {

  /**
   * NgRx store as a Signal
   */
  todos: Signal<Todo[]> = this.store.selectSignal(selectAllTodos);

  /**
   * NgRx store as a Signal
   */
  deletedTodos: Signal<Todo[]> = this.store.selectSignal(selectDeletedTodos());


  isFirstTodoSelected: Signal<boolean> = this.store.selectSignal(selectIsFirstTodoSelected);
  isLastTodoSelected: Signal<boolean> = this.store.selectSignal(selectIsLastTodoSelected);
  currentTodo: Signal<Todo | null> = this.store.selectSignal(selectCurrentTodo);

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

  nextTodo() {
      this.store.dispatch(nextTodo());
  }

  previousTodo() {
      this.store.dispatch(previousTodo());
  }

}
