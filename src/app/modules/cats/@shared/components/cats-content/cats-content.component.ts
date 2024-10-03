import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Cats } from '../../../../../shared/models/cats.interface';
import { Store } from '@ngxs/store';
import { CatsState } from '../../../../../store/state/cats.state';

@Component({
  selector: 'app-cats-content',
  templateUrl: './cats-content.component.html',
  styleUrl: './cats-content.component.scss',

})
export class CatsContentComponent implements OnInit {
  // @Input() public cats$!: Observable<Cats[]>;
  public localCats!: Cats[];

  constructor(private store: Store) { }

  ngOnInit(): void {
    combineLatest([
      this.store.select(CatsState.breedId),
      this.store.select(CatsState.limit),
      this.store.select(CatsState.cats),
    ]).pipe(
      map(([breedId, limit, cats]) => {
        return cats
          .filter(cat => (breedId ? cat.breeds[0]?.id === breedId : true)) // Если breedId задан, фильтруем по нему
          .slice(0, limit); // Ограничиваем по лимиту
      })
    ).subscribe(filteredCats => {
      this.localCats = filteredCats;
    });
  }
}