import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { Cats } from '../../../../../shared/models/cats.interface';
import { Store } from '@ngxs/store';
import { CatsState } from '../../../../../store/state/cats.state';
import { GetCatsByBreed } from '../../../../../store/actions/cats.actions';

@Component({
  selector: 'app-cats-content',
  templateUrl: './cats-content.component.html',
  styleUrl: './cats-content.component.scss',

})
export class CatsContentComponent implements OnInit {
  public localCats!: Cats[];
  public catsArrayByBreed!: Cats[];

  private breedId!: string;
  private limit!: number;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.streamToFilterCatsArray();
    this.getCatsByBreed();
  }

  private streamToFilterCatsArray() {
    combineLatest([
      this.store.select(CatsState.breedId),
      this.store.select(CatsState.limit),
      this.store.select(CatsState.cats),
    ]).pipe(
      map(([breedId, limit, cats]) => {
        return cats
          .filter(cat => (breedId ? cat.breeds[0]?.id === breedId : true)) // If breedId is set, filter by it
          .slice(0, limit); // Limit by limit
      })
    ).subscribe(filteredCats => {
      filteredCats ? this.localCats = filteredCats : this.store.dispatch(new GetCatsByBreed(this.breedId, this.limit));   // Load new Cats from other Api if in main Array not found
      console.log(this.localCats);
    });
  }

  // Load new Cats from other Api if in main Array not found
  private getCatsByBreed() {
    this.store.select(CatsState.catsByBreed).subscribe((data: Cats[]) => {
      this.catsArrayByBreed = data;
    })
  }

  public trackById(index: number, item: Cats): string {
    return item.id;
  }
}