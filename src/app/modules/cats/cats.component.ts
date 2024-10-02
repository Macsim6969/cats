import { Component } from '@angular/core';
import { CatsState, GetAllCats, LoadBreeds, SearchCats } from '../../store/cats.state';
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
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    // Загрузка пород кошек при инициализации компонента
    this.store.dispatch(new GetAllCats(100));
    this.store.dispatch(new LoadBreeds());
  }
}
