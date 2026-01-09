import {Injectable} from '@angular/core';

import {IRecipe, IRecipeList} from 'app/models';
import {MOCK_RECIPES} from 'app/recipe/services/recipes.mocks';


@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    public async getList(): Promise<IRecipeList> {
        const res = Promise.withResolvers<IRecipeList>();
        setTimeout(() => {
            res.resolve(MOCK_RECIPES);
        }, 2000);
        return res.promise;
    }

    public async get(id: number): Promise<IRecipe | null> {
        const res = Promise.withResolvers<IRecipe | null>();
        setTimeout(() => {
            const recipe: IRecipe | null = MOCK_RECIPES.find((recipe: IRecipe) => recipe.id === id) ?? null;
            res.resolve(recipe);
        }, 2000);
        return res.promise;
    }
}
