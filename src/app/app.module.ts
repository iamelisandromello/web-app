import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCarousselComponent } from './componentes/home/home-caroussel/home-caroussel.component';
import { ManterGaleriaComponent } from './componentes/galeria/manter-galeria/manter-galeria.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCarousselComponent,
    ManterGaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
