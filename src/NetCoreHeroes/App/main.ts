import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
require("style-loader!raw-loader!./styles.css");

platformBrowserDynamic().bootstrapModule(AppModule);
