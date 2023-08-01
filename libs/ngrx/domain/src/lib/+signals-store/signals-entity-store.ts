import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityMap, EntityMapOne, EntityState } from '@ngrx/entity';
import { Comparer, IdSelector, Update } from '@ngrx/entity/src/models';


export interface DefaultSignalsParams {
  selectedId: string | number | null;
  isLoaded: boolean;
  isLoading: boolean;
  error: any | null;
}

export function createSignalEntityProperties<T>(props: T = <T>{}): DefaultSignalsParams {
  return {
    ...props,
    selectedId: null,
    isLoaded: false,
    isLoading: true,
    error: null
  };
}

export interface SignalEntityOptions<T> {
  selectId?: IdSelector<T>;
  sortComparer?: false | Comparer<T>;
}

export class SignalsEntityStore<T> {


  state: WritableSignal<EntityState<T> & DefaultSignalsParams>;
  adapter: EntityAdapter<T>;

  readonly selectAll: Signal<T[]>;
  readonly selectIds: Signal<string[] | number[]>;
  readonly selectEntities: Signal<Dictionary<T>>;
  readonly selectTotal: Signal<number>;
  readonly selectedId: Signal<string | number | null>;
  readonly selectedEntity: Signal<T | null>;

  constructor(options?: SignalEntityOptions<T>) {
    const _options = {};

    if (options) {
      Object.assign(_options, options);
    }

    this.adapter = createEntityAdapter<T>(_options);

    // Store ( and state )

    this.state = signal(this.adapter.getInitialState(createSignalEntityProperties()));

    // Selectors
    this.selectAll = computed(() => {
      return this.adapter.getSelectors().selectAll(this.state());
    });

    this.selectIds = computed(() => {
      return this.adapter.getSelectors().selectIds(this.state());
    });

    this.selectTotal = computed(() => {
      return this.adapter.getSelectors().selectTotal(this.state());
    });

    this.selectEntities = computed(() => {
      return this.adapter.getSelectors().selectEntities(this.state());
    });

    this.selectedId = computed(() => {
      return this.state().selectedId;
    });

    this.selectedEntity = computed((): T | null => {

      const selectEntities: Dictionary<T> = this.selectEntities();
      const selectedId: string | number | null = this.selectedId();

      if (selectedId !== undefined && selectedId !== null && selectEntities[selectedId] !== undefined) {
        return <T>selectEntities[selectedId];
      }

      return null;


    });
  }

  private memoizedCurrentEntities: Dictionary<T> = {};

  /**
   * Returns entities that have been deleted from the store
   * for post-processing.
   *
   * Rather than using and effect to process deleted entities,
   * this method allows you to process deleted entities in other
   * locations in the app such as other feature services or components.
   */
  deletedEntities = computed(() => {


    const deletedEntities = Object.keys(this.memoizedCurrentEntities)
      .reduce((result: { [key: string]: T }, key: string) => {
        if (!this.selectEntities()[key] && this.memoizedCurrentEntities[key]) {
          result[key] = <T>this.memoizedCurrentEntities[key];
        }
        return result;
      }, {});

    this.memoizedCurrentEntities = {
      ...this.selectEntities()
    };

    return Object.values(deletedEntities);
  })

  // Reducer methods
  selectId(id: string | number): void {
    this.state.set({ ...this.state(), selectedId: id });
  }

  addOne(entity: T): void {
    this.state.set(this.adapter.addOne(entity, this.state()));
  }

  setOne(entity: T): void {
    this.state.set(this.adapter.setOne(entity, this.state()));
  }

  upsertOne(entity: T): void {
    this.state.set(this.adapter.upsertOne(entity, this.state()));
  }

  addMany(entities: T[]): void {
    this.state.set(this.adapter.addMany(entities, this.state()));
  }

  upsertMany(entities: T[]): void {
    this.state.set(this.adapter.upsertMany(entities, this.state()));
  }

  updateOne(update: Update<T>): void {
    this.state.set(this.adapter.updateOne(update, this.state()));
  }

  updateMany(updates: Update<T>[]): void {
    this.state.set(this.adapter.updateMany(updates, this.state()));
  }

  mapOne(entityMap: EntityMapOne<T>): void {
    this.state.set(this.adapter.mapOne(entityMap, this.state()));
  }

  mapMany(entityMap: EntityMap<T>): void {
    this.state.set(this.adapter.map(entityMap, this.state()));
  }

  deleteOne(id: string): void {
    this.state.set(this.adapter.removeOne(id, { ...this.state(), error: null }));
  }

  deleteMany(ids: string[]): void {
    this.state.set(this.adapter.removeMany(ids, this.state()));
  }

  setAll(entities: T[]): void {
    this.state.set(this.adapter.setAll(entities, { ...this.state(), isLoaded: true, isLoading: false, error: null }));
  }

  setMany(entities: T[]): void {
    this.state.set(this.adapter.setMany(entities, this.state()));
  }

  clear(): void {
    this.state.set(this.adapter.removeAll({ ...this.state(), error: null }));
  }

  error(error: any): void {
    this.state.set({ ...this.state(), error });
  }

  next(): void {
    const selectedId: string | number | null = this.state().selectedId;
    const ids: string[] | number[] = this.state().ids;
    if (ids.length > 0) {
      if (selectedId !== null && selectedId !== undefined) {
        const index = ids.findIndex((i: string | number) => i === selectedId);
        if (index !== -1) {
          const nextIndex = index + 1;
          if (nextIndex < ids.length) {
            this.selectId(ids[nextIndex]);
          } else {
            this.selectId(ids[0]);
          }
        }
      } else {
        this.selectId(ids[0]);
      }
    }
  }

  previous(): void {
    const selectedId: string | number | null = this.state().selectedId;
    const ids: string[] | number[] = this.state().ids;
    if (ids.length > 0) {
      if (selectedId !== null && selectedId !== undefined) {
        const index = ids.findIndex((i: string | number) => i === selectedId);
        if (index !== -1) {
          const previousIndex = index - 1;
          if (previousIndex >= 0) {
            this.selectId(ids[previousIndex]);
          } else {
            this.selectId(ids[ids.length - 1]);
          }
        }
      } else {
        this.selectId(ids[ids.length - 1]);
      }
    }
  }
}
