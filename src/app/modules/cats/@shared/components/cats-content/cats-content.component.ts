import { Component, OnInit } from '@angular/core';
import { combineLatest, map, take, timer } from 'rxjs';
import { Cats } from '../../../../../shared/models/cats.interface';
import { Store } from '@ngxs/store';
import { CatsState } from '../../../../../store/state/cats.state';
import { GetAllCats, GetCatsByBreed, LoadBreeds, UpdatedBreedIdAndLimit } from '../../../../../store/actions/cats.actions';
import { CatsService } from '../../../../../shared/services/cats.service';

@Component({
  selector: 'app-cats-content',
  templateUrl: './cats-content.component.html',
  styleUrl: './cats-content.component.scss'
})
export class CatsContentComponent implements OnInit {
  public localCats!: Cats[];
  public catsArrayByBreed!: Cats[];
  public errorData!: string;
  public isLoading: boolean = false;

  private breedId!: string;
  private limit!: number;

  constructor(
    private store: Store,
    private catsService: CatsService
  ) { }

  ngOnInit(): void {
    this.streamToFilterCatsArray();
    this.getCatsByBreed();
    this.streamToCheckErrorAPI();
  }

  private streamToFilterCatsArray() {
    combineLatest([
      this.store.select(CatsState.breedId),
      this.store.select(CatsState.limit),
      this.store.select(CatsState.cats),
    ]).pipe(
      map(([breedId, limit, cats]) => {
        this.isLoading = true;
        return cats
          .filter(cat => (breedId ? cat.breeds[0]?.id === breedId : true)) // If breedId is set, filter by it
          .slice(0, limit); // Limit by limit
      })
    ).subscribe(filteredCats => {
      filteredCats ? this.localCats = filteredCats : this.store.dispatch(new GetCatsByBreed(this.breedId, this.limit));   // Load new Cats from other Api if in main Array not found
      this.localCats.length > 1 ? this.isLoading = false : this.isLoading = true;
    });
  }

  // Load new Cats from other Api if in main Array not found
  private getCatsByBreed() {
    this.store.select(CatsState.catsByBreed).subscribe((data: Cats[]) => {
      this.catsArrayByBreed = data;
    })
  }

  private streamToCheckErrorAPI() {
    this.catsService._errorData$.subscribe((data) => {
      if (data) {
        this.errorData = data;
        timer(100).pipe(take(1)).subscribe(() => {
          this.isLoading = false;
          this.localCats = [];
        })
      }

    })
  }

  public reloadPage() {
    timer(1500).pipe(take(1)).subscribe(() => {
      window.location.reload();
    })
  }

  public trackById(index: number, item: Cats): string {
    return item.id;
  }
}