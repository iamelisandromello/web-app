import { Component, OnInit }  from '@angular/core';
import { ConfigClass }        from '../../../classes/config-class'; 
import { GaleriaService }     from '../../../servicos/galeria/galeria.service';

@Component({
  selector: 'app-home-caroussel',
  templateUrl: './home-caroussel.component.html',
  styleUrls: ['./home-caroussel.component.css']
})
export class HomeCarousselComponent implements OnInit {

  listImageGaleria    : any;
  server              : String  = ConfigClass.getUrlApi().toString();

  constructor(private galeriaService : GaleriaService) { }

  ngOnInit() {
    this.galeriaService.getTodos().subscribe(resp => {
      this.listImageGaleria = resp.body.dados.map(function(objeto){
        return {
          id_galeria  : objeto.id_galeria,
          titulo      : objeto.titulo,
          caminho     : this + (objeto.caminho ? objeto.caminho.substring(1) :objeto.caminho )
        }
      }, this.server);
    });
    console.log("dados: ", this.listImageGaleria);
  }

}
