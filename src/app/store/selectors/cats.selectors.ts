import { Selector } from "@ngxs/store";
import { Breeds } from "../../shared/models/breeds.interface";
import { CatsApiService } from "../../shared/services/catsApi.service";
import { Cats } from "../../shared/models/cats.interface";
import { CatsStateModel } from "../model/cats.model";

export class CatsState {
  constructor(private catsService: CatsApiService) { }

  // Селекторы для получения данных из состояния
  @Selector()
  static breeds(state: CatsStateModel): Breeds[] {
    return state.breeds;
  }

  @Selector()
  static cats(state: CatsStateModel): Cats[] {
    return state.cats;
  }

  @Selector()
  static allCats(state: CatsStateModel): Cats[] {
    return state.cats;
  }
}