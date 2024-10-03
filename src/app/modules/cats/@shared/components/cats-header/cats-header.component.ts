import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breeds } from '../../../../../shared/models/breeds.interface';
import { UpdatedBreedIdAndLimit } from '../../../../../store/actions/cats.actions';

@Component({
  selector: 'app-cats-header',
  templateUrl: './cats-header.component.html',
  styleUrl: './cats-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatsHeaderComponent {
  @Input() public breeds$!: Observable<Breeds[]>;
  public selectedBreed: string = '';
  public limit: number = 10;

  constructor(private store: Store) { }


  public searchCats() {
    this.store.dispatch(new UpdatedBreedIdAndLimit(this.selectedBreed, this.limit ? this.limit : this.limit = 10));
  }

  public trackById(index: number, item: Breeds): string {
    return item.id;
  }
}
