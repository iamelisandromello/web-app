import { Component, OnInit } from '@angular/core';

import { GaleriaService } from '../../../servicos/galeria/galeria.service';
import { ConfigClass }from '../../../classes/config-class';

@Component({
  selector: 'app-manter-galeria',
  templateUrl: './manter-galeria.component.html',
  styleUrls: ['./manter-galeria.component.css']
})
export class ManterGaleriaComponent implements OnInit {

  exibriListagemForm  : boolean = false;
  listImgGaleria      : any;
  server              : String  = ConfigClass.getUrlApi().toString();


  constructor( private galeriService:GaleriaService ) { }

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.galeriService.getTodos().subscribe(resp => {
      this.listImgGaleria = resp.body.dados.map(function(objeto){
        return {
          id_galeria  : objeto.id_galeria,
          titulo      : objeto.titulo,
          caminho     : this + (objeto.caminho ? objeto.caminho.substring(1) :objeto.caminho )
        }
      }, this.server);
      console.log('resposta', resp);
      console.log('resposta', this.listImgGaleria);
    });
  }

}
