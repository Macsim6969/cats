import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CatsApiService } from '../shared/services/catsApi.service';
import { Breeds } from '../shared/models/breeds.interface';
import { Cats } from '../shared/models/cats.interface';

// Определение действий
export class LoadBreeds {
  static readonly type = '[Cats] Load Breeds';
}

export class SearchCats {
  constructor(public breedId: string, public limit: number) {}
  static readonly type = '[Cats] Search Cats';
}

// Интерфейс для состояния
export interface CatsStateModel {
  breeds: Breeds[];
  cats: Cats[];
}

// Создание состояния
@State<CatsStateModel>({
  name: 'cats',
  defaults: {
    breeds: [],
    cats: []
  }
})


@Injectable()
export class CatsState {
  constructor(private catsService: CatsApiService) {}

  // Селекторы для получения данных из состояния
  @Selector()
  static breeds(state: CatsStateModel) {
    return state.breeds;
  }

  @Selector()
  static cats(state: CatsStateModel) {
    return state.cats;
  }

  // Загрузка пород кошек
  @Action(LoadBreeds)
  loadBreeds(ctx: StateContext<CatsStateModel>) {
    return this.catsService.getBreeds().pipe(
      tap(breeds => {
        const state = ctx.getState();
        console.log(breeds);
        ctx.setState({
          ...state,
          breeds: breeds
        });
      })
    );
  }

  // Поиск кошек по породе
  @Action(SearchCats)
  searchCats(ctx: StateContext<CatsStateModel>, action: SearchCats) {
    return this.catsService.getCatsByBreed(action.breedId, action.limit).pipe(
      tap(cats => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          cats: cats
        });
      })
    );
  }
}
