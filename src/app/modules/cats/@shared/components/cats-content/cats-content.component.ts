import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cats } from '../../../../../shared/models/cats.interface';

@Component({
  selector: 'app-cats-content',
  templateUrl: './cats-content.component.html',
  styleUrl: './cats-content.component.scss'
})
export class CatsContentComponent {
  @Input() public cats$!: Observable<Cats[]>;
}
