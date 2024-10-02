import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats.component';
import { RouterModule, Routes } from '@angular/router';
import { CatsApiService } from '../../shared/services/catsApi.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgMaterialModule } from '../../shared/modules/ngMaterial.module';

const routes: Routes = [
  { path: '', component: CatsComponent }
]

@NgModule({
  declarations: [
    CatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule
  ]
})
export class CatsModule { }
