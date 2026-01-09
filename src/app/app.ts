import {
    Component,
    signal,
} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {APP_TITLE} from './app.config';


@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
    imports: [
        RouterOutlet,
    ],
})
export class App {
    protected readonly title = signal(APP_TITLE);
}
