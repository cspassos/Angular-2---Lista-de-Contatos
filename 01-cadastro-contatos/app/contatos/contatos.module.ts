import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoDetalheComponent } from './contato-detalhe.component';
import {ContatoRoutingModule} from './contato-routing.module';
import {ContatoService} from './contato.service';
import {ContatoBuscaComponent} from './contato-busca.component';

@NgModule({
    imports: [
        CommonModule,
        ContatoRoutingModule,
        FormsModule
    ],
    declarations: [
        ContatoBuscaComponent,
        ContatosListaComponent,
        ContatoDetalheComponent
    ],
    exports: [
        ContatoBuscaComponent, // é preciso exportar para ele levar ele para o aap.component
        ContatosListaComponent
    ],
    providers: [
        ContatoService //Vai instanciar o contatoService
    ]
})
export class ContatosModule {}