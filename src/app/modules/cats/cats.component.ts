import { Component } from '@angular/core';
import { CatsApiService } from '../../shared/services/catsApi.service';
import { CatsState, LoadBreeds, SearchCats } from '../../store/cats.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breeds } from '../../shared/models/breeds.interface';
import { Cats } from '../../shared/models/cats.interface';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.scss'
})
export class CatsComponent {
  @Select(CatsState.breeds) breeds$!: Observable<Breeds[]>;
  @Select(CatsState.cats) cats$!: Observable<Cats[]>;

  public selectedBreed: string = '';
  public limit: number = 10;

  constructor(private store: Store) { }

  ngOnInit(): void {
    // Загрузка пород кошек при инициализации компонента
    this.store.dispatch(new LoadBreeds());
  }

  searchCats() {
    // Вызов действия для поиска кошек
    this.store.dispatch(new SearchCats(this.selectedBreed, this.limit));
  }
}
