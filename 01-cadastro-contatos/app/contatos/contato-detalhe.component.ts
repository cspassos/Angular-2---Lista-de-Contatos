import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common'; 

import {ContatoService} from './contato.service'

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit {
    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute, //pegue a rota que estiver ativa, ex: contato/save
        private location: Location
    ) {}

    ngOnInit(): void {
        console.log('on init');
        //params = vai retornar os parametros da nossa rota
        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];//significa que queremos oegar do params a posição id
                                        //O +params é para ele converter o id em numero, pq ele vem como string
            console.log(id);
        })
    }
}