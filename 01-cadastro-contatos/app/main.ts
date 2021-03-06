import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core';

import { AppModule } from './app.modules'

enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);