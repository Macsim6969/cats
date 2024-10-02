import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllCats, LoadBreeds } from '../../store/actions/cats.actions';

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
