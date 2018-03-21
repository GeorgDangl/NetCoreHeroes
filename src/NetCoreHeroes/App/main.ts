import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// Global styles for the app are imported via the 'style-loader'
// This puts the content of 'styles.css' in a <style> tag in the <head> of the page
require("style-loader!./styles.css");

platformBrowserDynamic().bootstrapModule(AppModule);
