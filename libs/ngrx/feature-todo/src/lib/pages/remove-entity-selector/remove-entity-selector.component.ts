import { ChangeDetectionStrategy, Component, DestroyRef, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  createTodo,
  deleteTodo, isTodoForm,
  selectAllTodos,
  selectDeletedTodos,
  Todo, TodoForm,
  TodoParams, TodoSignalsFacade
} from '@ngrx-research/ngrx/domain';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'ngrx-remove-entity-selector',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatIconModule ],
  templateUrl: './remove-entity-selector.component.html',
  styleUrls: [ './remove-entity-selector.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveEntitySelectorComponent {


  selectedDisplayedColumns: string[] = [ 'id', 'title', 'description', 'isComplete', 'delete' ];
  deletedDisplayedColumns: string[] = [ 'id', 'title', 'description', 'isComplete'];

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    isComplete: new FormControl(false)
  });

  constructor(public todoSignalsFacade: TodoSignalsFacade) {
  }

  addTodo() {
    if (this.todoForm.dirty && this.todoForm.valid && isTodoForm(this.todoForm.value)) {
     this.todoSignalsFacade.addTodo(this.todoForm.value);
    }
  }

  deleteTodo(todo: Todo) {
    this.todoSignalsFacade.deleteTodo(todo);
  }
}
