import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCarousselComponent} from './componentes/home/home-caroussel/home-caroussel.component';
import { ManterGaleriaComponent} from './componentes/galeria/manter-galeria/manter-galeria.component';
import { FontAwesomeComponent} from './componentes/fonts/font-awesome/font-awesome.component';

const routes: Routes = [
  {path: 'home/home-caroussel', component : HomeCarousselComponent},
  {path: 'fonts/font-awesome', component : FontAwesomeComponent},
  {path: 'galeria/manter-galeria', component : ManterGaleriaComponent},
  {path: 'galeria/manter-galeria/:id', component : ManterGaleriaComponent},
  {path: '', component : HomeCarousselComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
