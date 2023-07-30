export interface TodoParams {
  title: string;
  description: string;
  isComplete: boolean;
}

export interface Todo extends TodoParams {
  id: string;
}
