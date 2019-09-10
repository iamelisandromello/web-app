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
  mensagem            : any;

  constructor( private galeriService:GaleriaService ) { }

  ngOnInit() {
    this.listar();
  }

  verificarRetornoHttp(resp){
    if(resp.status >= 400) {
      this.exibirMsgAlert("Erro ao realizar a requisição", "erro");
      return true;
    }
    else {
      if(resp.body.erro) {
        this.exibirMsgAlert(resp.body.msg, "erro");
        return true;
      }
      else {
        if(resp.body.msg != null) {
          this.exibirMsgAlert(resp.body.msg, "sucesso");
          return false;
        }
      }
    }
    return false;
  }

  exibirMsgAlert(msg, tipo) {
    let dados = "";
    if(tipo == "sucesso") {
      dados = `<div classe 'alert alert-success' role='alert'> 
        <strong>${msg}</strong>
      </div>`;
    }
    else if (tipo == "erro") {
      dados = `<div class = 'alert alert-danger' role='alert'> 
        <strong>${msg}</strong>
      </div>`;
    }
    this.mensagem = dados;
  }

  limparAlert() {
    this.mensagem = "";
  }

  listar(): void {
    this.galeriService.getTodos().subscribe(resp => {

      if (!this.verificarRetornoHttp(resp)) {
        this.listImgGaleria = resp.body.dados.map(function(objeto){
          return {
            id_galeria  : objeto.id_galeria,
            titulo      : objeto.titulo,
            caminho     : this + (objeto.caminho ? objeto.caminho.substring(1) :objeto.caminho )
          }
        }, this.server);
        console.log('resposta', resp);
        console.log('resposta', this.listImgGaleria);
      }
    });
  }
}
