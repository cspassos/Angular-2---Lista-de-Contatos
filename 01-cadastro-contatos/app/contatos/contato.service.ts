import {Injectable} from '@angular/core';

import {Contato} from './contato.model';
import {CONTATOS} from './contatos-mock';

@Injectable()
export class ContatoService {
    getContatos(): Promise<Contato[]>{
        return Promise.resolve(CONTATOS);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id)); //percorre todo o array de contato
                //quando o id for igual ao do array ele me retorna
    }
    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => this.getContatos())
    }
}