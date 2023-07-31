import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Todo} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    // return this.client.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    return of([]);
  }
}
