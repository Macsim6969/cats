import { Component } from '@angular/core';
import { CatsApiService } from '../../shared/services/catsApi.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.scss'
})
export class CatsComponent {
  breeds: any[] = [];
  selectedBreed: string = '';
  cats: any[] = [];
  limit: number = 10;

  constructor(private catsService: CatsApiService) { }

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds() {
    this.catsService.getBreeds().subscribe((data) => {
      this.breeds = data;
    });
  }

  searchCats() {
    this.catsService.getCatsByBreed(this.selectedBreed, this.limit).subscribe((data) => {
      this.cats = data;
    });
  }
}
