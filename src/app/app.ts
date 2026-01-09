import {
    Component,
    signal,
} from '@angular/core';

import {RecipeList} from "app/recipe/components/recipe-list/recipe-list.component";

import {APP_TITLE} from './app.config';


@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
    imports: [
        RecipeList
    ],
})
export class App  {
    protected readonly title = signal(APP_TITLE);
}
