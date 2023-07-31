import { v4 as uuidv4 } from 'uuid';

export interface TodoParams {
  title: string;
  description: string;
  isComplete: boolean;
}

export interface Todo extends TodoParams {
  id: string;
}


export interface TodoForm {
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

export function createTodoFromFrom(todoForm: TodoForm): Todo {
  return {
    ...createTodoParams(todoForm),
    id: uuidv4()
  }
}
