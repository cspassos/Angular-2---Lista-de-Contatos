import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import {ContatoService} from './contato.service'
import {DialogService} from '../dialog.service'

@Component({// informar que essa classe é um component
    //Seta o caminho relativo como base para o HTMl que esta sendo declarado no metadado templateURL.
    moduleId: module.id,//utilizado para montar o arquivo pelo id em alguma url. 
    //Criar e inserir uma instancia deste component onde ele encontrar a tag correspondente no HTML pai
    selector: 'contatos-lista',//ex: <contato-lista></contato-lista>
    //caminho relativo para o arquivo HTML que representa o Template deste Component
    templateUrl: 'contatos-lista.component.html',
})
export class ContatosListaComponent implements OnInit {

    contatos: Contato[] = []; // = [] ->> inicializar com o array vazio
    mensagem: {};
    classesCss: {};
    private currentTimeout: any;

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.contatoService.findAll()
            .then((contatos: Contato[]) => {
                this.contatos = contatos; 
            }).catch(err => {
                this.mostrarMensagem({
                    tipo: 'danger',
                    texto: 'Ocorreu um erro ao buscar a lista de contatos!'
                });
            });
    }

    onDelete(contato: Contato):void {
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + '?')
            .then((canDelete: boolean) => {

                if(canDelete) {
                    this.contatoService
                        .delete(contato)
                        .then(() => { //retornar todos os contatos menos o deletado
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);

                            this.mostrarMensagem({
                                tipo: 'success',
                                texto: 'Contato "' + contato.nome + '" deletado!'
                            });
                        }).catch(err => {
                            console.log(err)
                            this.mostrarMensagem({
                                tipo: 'danger',
                                texto: 'Ocorreu um erro ao deletar contato!'
                            });
                        })
                }
            })
    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if(mensagem.tipo != 'danger') {

            if(this.currentTimeout){
                clearTimeout(this.currentTimeout);
            }

            this.currentTimeout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }

    private montarClasses(tipo: string): void {
        this.classesCss = {
            'alert': true
        };
        this.classesCss['alert-' + tipo] = true; //alert-success ou alert-danger .....
    }

}