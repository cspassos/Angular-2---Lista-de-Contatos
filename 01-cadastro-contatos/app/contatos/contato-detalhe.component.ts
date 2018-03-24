import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common'; 

import {ContatoService} from './contato.service'
import { Contato } from './contato.model';

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit {
    
    contato: Contato;
    private isNew: boolean = true;
    
    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute, //pegue a rota que estiver ativa, ex: contato/save
        private location: Location
    ) { }

    ngOnInit(): void {
        this.contato = new Contato(0, '', '', '');
        //params = vai retornar os parametros da nossa rota
        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];//significa que queremos pegar do params a posição id
            //O +params é para ele converter o id em numero, pq ele vem como string
            console.log(id);

            if (id) {

                this.isNew = false; //significa que nao estou cadastrando um novo contato e sim alterando.

                this.contatoService.find(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    });
            }
        });
    }

    getFormGroupClass(isValid, isPristine) {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,//so vai ser retornado se o campo nao for valido e se ja for alterado
            'has-success': isValid && !isPristine//vai ser retornado se o campo for valido e ja foi alterado
        };
    }
    getFormControlClass(isValid, isPristine) {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }

    onSubmit(): void {
        let promise;

        if(this.isNew) {
            console.log('cadastrar contato');
            promise = this.contatoService.create(this.contato);
        }else {
            console.log('alterar contato');
            promise = this.contatoService.update(this.contato);
        }
        promise.then(contato => this.goBack());//location = voltar para a pagina anterior
    }

    goBack(): void {
        this.location.back();//location = voltar para a pagina anterior
    }
}