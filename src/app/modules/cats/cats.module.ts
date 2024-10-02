import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '../../shared/modules/ngMaterial.module';
import { CatsContentComponent } from './@shared/components/cats-content/cats-content.component';
import { CatsHeaderComponent } from './@shared/components/cats-header/cats-header.component';

const routes: Routes = [
  { path: '', component: CatsComponent }
]

@NgModule({
  declarations: [
    CatsComponent,
    CatsHeaderComponent,
    CatsContentComponent
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
