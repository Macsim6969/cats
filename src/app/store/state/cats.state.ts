import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CatsApiService } from '../../shared/services/catsApi.service';
import { CatsStateModel } from '../model/cats.model';
import { GetAllCats, LoadBreeds, UpdatedBreedIdAndLimit } from '../actions/cats.actions';
import { Breeds } from '../../shared/models/breeds.interface';
import { Cats } from '../../shared/models/cats.interface';


// Создание состояния
@State<CatsStateModel>({
  name: 'cats',
  defaults: {
    breeds: [],
    cats: [],
    breedId: '',
    limit: 10
  }
})

@Injectable()
export class CatsState {
  constructor(private catsService: CatsApiService) { }
  @Selector()
  static breeds(state: CatsStateModel): Breeds[] {
    return state.breeds;
  }

  @Selector()
  static cats(state: CatsStateModel): Cats[] {
    return state.cats;
  }
  @Selector()
  static breedId(state: CatsStateModel): string {
    return state.breedId;
  }
  @Selector()
  static limit(state: CatsStateModel): number {
    return state.limit;
  }

  @Action(GetAllCats)
  getAllCats(ctx: StateContext<CatsStateModel>) {
    return this.catsService.getAllCatsByBreeds().pipe(
      tap(cats => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          cats: cats
        });
      })
    );
  }

  // Загрузка пород кошек
  @Action(LoadBreeds)
  loadBreeds(ctx: StateContext<CatsStateModel>) {
    return this.catsService.getBreeds().pipe(
      tap(breeds => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          breeds: breeds
        });
      })
    );
  }

  // Поиск кошек по породе
  @Action(UpdatedBreedIdAndLimit)
  searchCats(ctx: StateContext<CatsStateModel>, action: UpdatedBreedIdAndLimit) {

    const state = ctx.getState();
    ctx.setState({
      ...state,
      breedId: action.breedId,
      limit: action.limit
    });

  }


}
