import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {HttpModule} from '@angular/http'

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import { AppComponent } from './app.components';
import {AppRoutingModule } from './app-routing.module';
import { ContatosModule } from './contatos/contatos.module';
import {DialogService} from './dialog.service';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        DialogService
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}