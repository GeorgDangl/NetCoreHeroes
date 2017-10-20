/*
 * See here if using Typescript 1.8.34 extensions or below, there's a bug that needs some manual fixing:
 * https://github.com/Microsoft/TypeScript/issues/8518
 */

import { Component } from '@angular/core';

@Component({
    selector: 'my-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent { }
