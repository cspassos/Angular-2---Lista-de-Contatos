import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Contato } from "./contato.model";
import { ContatoService } from "./contato.service";

@Component({
    moduleId: module.id,
    //Criar e inserir uma instancia deste component onde ele encontrar a tag correspondente no HTML pai
    selector: 'contato-busca',//esta sendo usado no app.component.html, assim ele consegue pegar o [(busca)]="termo"
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
})
export class ContatoBuscaComponent implements OnInit, OnChanges {
    //OnChanges ouvir as alteração do buscar, que estao sendo feitas no app.component.html

    //@Input() => Via de entrada de dados para o componente
    @Input() busca: string; //Recebo o evento
    //EventEmitter = Emissor de eventos, ayraves desses eventos captura uma string;
    //Output = Para o event ser acessivel fora do component
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>(); //Passo o evento
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.contatos = this.termosDaBusca
            .debounceTime(500) // aguarde por 500ms para emitir novos eventos
            .distinctUntilChanged() // ignore se o próximo termo de busca for igual ao anterior
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });
        
        this.contatos.subscribe((contatos: Contato[]) => {
            console.log('Retornou do servidor: ', contatos);
        });
    }
    //SimpleChanges = vai trazer um objeto que contem as propiedades que estao marcadas com Input que foram alteradas
    ngOnChanges(changes: SimpleChanges): void {//assim conseguimos acessar o valor atual e o valor anterior
        let busca: SimpleChange = changes['busca']; //vai receber o changes na posição busca
        this.search(busca.currentValue);//currentValue = valor atual
    }

    search(termo: string): void {
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');//quando eu editar ele vai limpar a busca
    }
}