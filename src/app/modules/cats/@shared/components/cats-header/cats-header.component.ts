import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breeds } from '../../../../../shared/models/breeds.interface';
import { GetAllCats, SearchCats } from '../../../../../store/actions/cats.actions';

@Component({
  selector: 'app-cats-header',
  templateUrl: './cats-header.component.html',
  styleUrl: './cats-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatsHeaderComponent  {
  @Input() public breeds$!: Observable<Breeds[]>;
  public selectedBreed: string = '';
  public limit: number = 10;

  constructor(private store: Store) { }


  public searchCats() {
    this.selectedBreed === '' ? this.store.dispatch(new GetAllCats(this.limit)) : this.store.dispatch(new SearchCats(this.selectedBreed, this.limit));
  }

  public trackById(index: number, item: Breeds): string {
    return item.id;
  }
}
