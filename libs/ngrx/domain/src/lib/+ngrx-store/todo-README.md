# Todo NgRx Entity Store

This Store is built to NgRx recommended configuration. See [NgRX Entity Adapter Doc](https://ngrx.io/guide/entity/adapter) on how use the NgRx Entity Store.

## Add to your application

You have three options:

1. Import the `todo.module` into your app or library module.
2. Configure as a Feature store in your app or library module:

   ```typescript
   import * as fromTodoReducer from '[ relative path or lib api ].ngPatAccountReducer';

   StoreModule.forFeature(
     fromTodoReducer.todosFeatureKey,
     fromTodoReducer.todoReducer,
     {
       initialState: fromTodoReducer.initialTodoState
     }
   ),
     EffectsModule.forFeature([TodoEffects]);
   ```

3. Configure as a Root store in your app or library module:

   ```typescript

      import * as fromTodoReducer from '[ relative path or lib api ].ngPatAccountReducer';

      StoreModule.forRoot(
            {
                [fromTodoReducer.todosFeatureKey]: fromTodoReducer.todoReducer,
                ...
            },
            {
                initialState: {
                    [fromTodoReducer.todosFeatureKey]: fromTodoReducer.initialTodoState,
                    ...
                },
            }
        ),
      EffectsModule.forRoot([TodoEffects]),
   ```

4. Use the `TodoFacade` in your components or services.

    ```typescript
   
    constructor(private todoFacade: TodoFacade) {}
   ```


   ```angular2html
      <div *ngFor="let todo of todos">
        {{ todo | json }}
      </div>
  ```
