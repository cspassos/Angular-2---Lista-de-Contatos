import {InMemoryDbService} from 'angular-in-memory-web-api'//Criar API simulada

import {Contato} from './contatos/contato.model';

export class InMemoryDataService implements InMemoryDbService {
    
    createDb(): {} {


        let contatos: Contato[] = [
            {id: 1, nome: 'fulano Souza', email: 'email@.com', telefone: '(00) 000-111)'},
            {id: 2, nome: 'souza', email: 'emailsadasd@.com', telefone: '(00) 0011-111)'},
            {id: 3, nome: 'passos', email: 'email@.cosadasdm', telefone: '(00) 222200-111)'},
            {id: 4, nome: 'testes', email: 'email@.cadasdom', telefone: '(00) 44400-111)'},
        ];

        return {contatos};
    }
}