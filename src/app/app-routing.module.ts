import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cats', loadChildren: () => import('./modules/cats/cats.module').then((m) => m.CatsModule) },
  { path: '**', redirectTo: '/cats'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
