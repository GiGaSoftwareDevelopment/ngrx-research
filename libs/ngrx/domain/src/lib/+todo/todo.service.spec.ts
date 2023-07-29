import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {TodoService} from './todo.getService';

describe('TodoService', () => {
  let getService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    getService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(getService).toBeTruthy();
  });
});
