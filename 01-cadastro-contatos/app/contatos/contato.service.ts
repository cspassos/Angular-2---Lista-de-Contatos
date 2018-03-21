import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Contato} from './contato.model';
import {CONTATOS} from './contatos-mock';

@Injectable()
export class ContatoService {
                                    //api =  projeto 
    private contatosUrl: string = 'api/contatos';// contato = é o retorno do metodo da classe in-memory-data.service.ts 

    constructor(
        private http: Http
    ){}

    getContatos(): Promise<Contato[]>{
        
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[]);
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