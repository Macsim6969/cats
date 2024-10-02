import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CatsState, GetAllCats, SearchCats } from '../../../../../store/cats.state';
import { Observable } from 'rxjs';
import { Breeds } from '../../../../../shared/models/breeds.interface';

@Component({
  selector: 'app-cats-header',
  templateUrl: './cats-header.component.html',
  styleUrl: './cats-header.component.scss'
})
export class CatsHeaderComponent {
  @Select(CatsState.breeds) breeds$!: Observable<Breeds[]>;
  public selectedBreed: string = '';
  public limit: number = 10;

  constructor(private store: Store) { }

  public searchCats() {
    this.selectedBreed === '' ? this.store.dispatch(new GetAllCats(this.limit)) : this.store.dispatch(new SearchCats(this.selectedBreed, this.limit));
  }
}
