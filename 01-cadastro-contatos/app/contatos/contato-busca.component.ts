import { OnInit, Component } from '@angular/core';

export {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html'
})
export class ContatoBuscaComponent implements OnInit{

    ngOnInit(){}

    search(termo: string): void {
        console.log(termo);
    }
}