import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCarousselComponent } from './componentes/home/home-caroussel/home-caroussel.component';
import { ManterGaleriaComponent } from './componentes/galeria/manter-galeria/manter-galeria.component';
import { FontAwesomeComponent } from './componentes/fonts/font-awesome/font-awesome.component';

import { GaleriaService } from './servicos/galeria/galeria.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeCarousselComponent,
    FontAwesomeComponent,
    ManterGaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [GaleriaService],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee);
    library.addIconPacks(fas, far);
  }
}
