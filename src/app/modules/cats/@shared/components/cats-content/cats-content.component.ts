import { Select } from '@ngxs/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cats } from '../../../../../shared/models/cats.interface';
import { CatsState } from '../../../../../store/selectors/cats.selectors';

@Component({
  selector: 'app-cats-content',
  templateUrl: './cats-content.component.html',
  styleUrl: './cats-content.component.scss'
})
export class CatsContentComponent {
  @Select(CatsState.allCats) cats$!: Observable<Cats[]>;

}
