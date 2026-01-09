import { Routes } from '@angular/router';
import {RecipeInfoComponent} from 'app/recipe/components/recipe-info/recipe-info.component';
import {RecipeList} from 'app/recipe/components/recipe-list/recipe-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipes',
    },
    {
        path: 'recipes',
        component: RecipeList,
        children: [
            {
                path: ':id',
                component: RecipeInfoComponent,
            }
        ]
    },
];
