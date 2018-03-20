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
                this.contatoService.getContato(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    })
            }
        })
    }
}