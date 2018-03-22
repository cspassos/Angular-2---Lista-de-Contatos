import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Contato} from './contato.model';
import {CONTATOS} from './contatos-mock';

@Injectable()
export class ContatoService {
                                    //api =  projeto 
    private contatosUrl: string = 'api/contatos';// contato = é o retorno do metodo da classe in-memory-data.service.ts 
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ){}

    getContatos(): Promise<Contato[]>{
        
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id)); //percorre todo o array de contato
                //quando o id for igual ao do array ele me retorna
    }

    create(contato: Contato): Promise<Contato> {
        return this.http.post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
    }

    update(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http.put(url, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
    }

    delete(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
        .delete(url, {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato);
    }

    private handleError(err: any): Promise<Contato[]> {
        return Promise.reject(err.message || err);
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => this.getContatos())
    }
}