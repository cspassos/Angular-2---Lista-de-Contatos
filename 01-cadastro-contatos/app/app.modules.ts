import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.components';
import {AppRoutingModule } from './app-routing.module';
import { ContatosModule } from './contatos/contatos.module';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule
    ],
    providers: [{provide: APP_BASE_HREF, useValue : '/' }],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}