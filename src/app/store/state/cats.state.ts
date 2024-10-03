import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CatsApiService } from '../../shared/services/catsApi.service';
import { CatsStateModel } from '../model/cats.model';
import { GetAllCats, GetCatsByBreed, LoadBreeds, UpdatedBreedIdAndLimit } from '../actions/cats.actions';
import { Breeds } from '../../shared/models/breeds.interface';
import { Cats } from '../../shared/models/cats.interface';


// Создание состояния
@State<CatsStateModel>({
  name: 'cats',
  defaults: {
    breeds: [],
    cats: [],
    catsByBreed: [],
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

  @Selector()
  static catsByBreed(state: CatsStateModel): Cats[] {
    return state.catsByBreed;
  }

  @Action(GetCatsByBreed)
  getCatsByBreed(ctx: StateContext<CatsStateModel>, action: GetCatsByBreed) {
    return this.catsService.getCatsByBreed(action.breedId, action.limit).pipe(
      tap(cats => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          catsByBreed: cats
        })
      })
    )
  }

  // Load All Cats
  @Action(GetAllCats)
  getAllCats(ctx: StateContext<CatsStateModel>, action: GetAllCats) {
    return this.catsService.getAllCatsByBreeds(action.limit).pipe(
      tap(cats => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          cats: cats
        });
      })
    );
  }

  // Cat Breeds Download
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

  // Search cats by breed
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
