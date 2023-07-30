import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { createTodo, deleteTodo, selectAllTodos, Todo, TodoParams } from '@ngrx-research/ngrx/domain';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { filter, map } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

interface TodoForm {
  title?: string | null | undefined
  description?: string | null | undefined;
  isComplete?: boolean | null | undefined;
}

export function isTodoForm(todoForm: TodoForm): boolean {
  return todoForm.title !== undefined && todoForm.description !== undefined && todoForm.isComplete !== undefined;
}

export function createTodoParams(todoForm: TodoForm): TodoParams {
  return {
    title: todoForm.title!,
    description: todoForm.description!,
    isComplete: todoForm.isComplete!
  };
}

@Component({
  selector: 'ngrx-remove-entity-selector',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatIconModule ],
  templateUrl: './remove-entity-selector.component.html',
  styleUrls: [ './remove-entity-selector.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveEntitySelectorComponent {

  destroyRef = inject(DestroyRef);

  displayedColumns: string[] = [ 'id', 'title', 'description', 'isComplete', 'delete' ];

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    isComplete: new FormControl(false)
  });

  todos: Signal<Todo[]> = toSignal(this.store.select(selectAllTodos), {
    initialValue: []
  });

  constructor(private store: Store) {
  }

  addTodo() {
    if (this.todoForm.dirty && this.todoForm.valid && isTodoForm(this.todoForm.value)) {
      this.store.dispatch(createTodo({
        todo: createTodoParams(this.todoForm.value)
      }))
    }
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(deleteTodo({
      id: todo.id
    }));
  }
}
