import { AfterViewInit, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetAllCats, LoadBreeds } from '../../store/actions/cats.actions';
import { Breeds } from '../../shared/models/breeds.interface';
import { Observable } from 'rxjs';
import { CatsState } from '../../store/state/cats.state';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.scss'
})
export class CatsComponent implements AfterViewInit {
  @Select(CatsState.breeds) breeds$!: Observable<Breeds[]>;

  constructor(private store: Store) { }

  // Start Loading Load Breeds and Get All Cats
  ngAfterViewInit(): void {
    this.store.dispatch(new LoadBreeds());
    this.store.dispatch(new GetAllCats(100));
  }
}
