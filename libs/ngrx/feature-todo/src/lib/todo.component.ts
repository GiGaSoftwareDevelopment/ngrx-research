import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFacade } from '@undefined/ngrx/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ngrx-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList$ = this.todoFacade.todoList$;

  constructor(private todoFacade: TodoFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.todoFacade.load();
  }
}
