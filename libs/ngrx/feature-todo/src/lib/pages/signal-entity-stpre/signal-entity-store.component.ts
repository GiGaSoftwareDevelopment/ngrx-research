import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { createTodoFromFrom, createTodoParams, isTodoForm, SignalsEntityStore } from '@ngrx-research/ngrx/domain';
import { Todo } from '@ngrx-research/ngrx/domain';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ngrx-signal-entity-store',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, ReactiveFormsModule ],
  templateUrl: './signal-entity-store.component.html',
  styleUrls: ['./signal-entity-store.component.scss']
})
export class SignalEntityStoreComponent {


  selectedDisplayedColumns: string[] = [ 'id', 'title', 'description', 'isComplete', 'delete' ];
  deletedDisplayedColumns: string[] = [ 'id', 'title', 'description', 'isComplete'];

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    isComplete: new FormControl(false)
  });


  /**
   * Signal store
   */
  store: SignalsEntityStore<Todo> = new SignalsEntityStore<Todo>();


  addTodo() {
    if (this.todoForm.dirty && this.todoForm.valid && isTodoForm(this.todoForm.value)) {
      this.store.addOne(createTodoFromFrom(this.todoForm.value));
    }
  }

  deleteTodo(todo: Todo) {
    this.store.deleteOne(todo.id);
  }

}
