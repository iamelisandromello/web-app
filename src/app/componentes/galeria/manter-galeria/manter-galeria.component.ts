import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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
  galeriaFormGroup    : any;
  imagemUrl           : any;
  registro            : any = {}; 

  constructor( private galeriService:GaleriaService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.galeriaFormGroup = this.formBuilder .group({
      id_galeria    : [],
      titulo        : [],
      dados_imagem  : null
    });

    this.listar();
  }

  prepararFormCadastro() {
    this.limparMSgAlert();
    this.exibriListagemForm = true;
    //console.log("teste");   
  }

  onSubmit() {
    console.log('salvando dados...');
    console.log(this.galeriaFormGroup.value);
    console.log(this.galeriaFormGroup);

    //Verificar Operação CAdastrar/Salvar
    if(this.registro.id_galeria) {
      console.log('Entrou no editar');
      console.log(this.galeriaFormGroup);
      this.editar(this.galeriaFormGroup.value);
    }
    else {
      this.cadastrar(this.galeriaFormGroup.value);
    }

  }

  editar(dados: any) {
    console.log(dados);
    this.galeriService.editar(dados).subscribe( resp => {
        if(!this.verificarRetornoHttp(resp)) {
          this.limparForm();
          this.listar();
          this.exibriListagemForm = false;
        }
      }
    );
  }

  cadastrar(dados: any) {
    console.log(dados);
    this.galeriService.cadastrar(dados).subscribe( resp => {
        if(!this.verificarRetornoHttp(resp)) {
          this.limparForm();
          this.listar();
          this.exibriListagemForm = false;
        }
      }
    );
  }

  prepararFormEditar(id : number): void {
    console.log('id', id);
    this.exibriListagemForm = true;

    this.galeriService.getId(id).subscribe(resp =>{
      if(!this.verificarRetornoHttp(resp)) {
        this.registro.id_galeria = resp.body.dados[0].id_galeria;
        this.registro.titulo = resp.body.dados[0].titulo;
        if(resp.body.dados[0].caminho != null) {
          this.imagemUrl = this.server + resp.body.dados[0].caminho.substring(1);
          console.log('IMG :', this.imagemUrl = this.server + resp.body.dados[0].caminho.substring(1));
        }
      }
    });
  }

  deletar(id: number): void {
    console.log('Deletar ID: ', id);
    this.galeriService.deletar(id).subscribe(resp => {
      if(!this.verificarRetornoHttp(resp )) {
        this.listar();
        
      }
    })
  }

  cancelarOpercao() {
    this.limparForm();
    this.exibriListagemForm = false;
  }

  limparForm(){
    this.galeriaFormGroup.reset();
    let formHTML = <HTMLFormElement >document.getElementById('galeriaForm');
    formHTML.reset();
    this.imagemUrl = null;
  }

  carregarImagem( event ) {
    console.log('carregando uma imagem ...'); // verificar se a imagem foi selecionada
    if(event.target.files.length > 0) {
      console.log('Imagem Selecionada ...'); // verificar se a imagem foi selecionada
      let campoUploadImagem  = event.target;
      const leitor = new FileReader();
      const arquivo = campoUploadImagem.files[0];
      leitor.readAsDataURL(arquivo);
      leitor.onload = () => {
        const dataUrl = leitor.result;
        this.imagemUrl = dataUrl;
        console.log("dados imagem: ", this.imagemUrl);

        this.galeriaFormGroup.get('dados_imagem').setValue({
           nome_arquivo   : arquivo.name,
           tipo_arquivo   : arquivo.type,
           imagem_base64  : (leitor.result as string).split(',')[1]
        });
        console.log('dados cadastro: ', this.galeriaFormGroup.value);
      }
    }

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

    console.log('msg:', tipo);
    if(tipo == "sucesso") {
      dados = `<div class = 'alert alert-success' role='alert'> 
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

  limparMSgAlert() {
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