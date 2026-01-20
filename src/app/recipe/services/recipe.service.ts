import {Injectable} from '@angular/core';

import {
    BehaviorSubject,
    map,
    Observable,
} from 'rxjs';

import {IRecipe, IRecipeList} from 'app/models';
import {MOCK_RECIPES} from 'app/recipe/services/recipes.mocks';

async function delay(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
};

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private _list$ = new BehaviorSubject<IRecipeList>([]);

    public get list$(): Observable<IRecipeList> {
        return this._list$.pipe(map(list => [...list]));
    }

    public async getList(): Promise<IRecipeList> {
        await delay(2000);
        const list: IRecipeList = MOCK_RECIPES;
        this._list$.next(list);
        return list;
    }

    public async get(id: number): Promise<IRecipe | null> {
        await delay(2000);
        return MOCK_RECIPES.find((recipe: IRecipe) => recipe.id === id) ?? null;
    }

    public async add(partialRecipe: Omit<IRecipe, 'id' | 'imgUrl'>): Promise<IRecipe> {
        await delay(1000);
        const recipe: IRecipe = {
            ...partialRecipe,
            id: this.getMaxId(MOCK_RECIPES),
            imgUrl: '//placeholdmon.vercel.app/300x200.png?name=' + partialRecipe.name,
        }

        MOCK_RECIPES.push(recipe);
        this._list$.next(MOCK_RECIPES);
        return recipe;
    }

    private getMaxId(list: IRecipe[]): number {
        return list.reduce((sum: number, {id}: IRecipe) => {
            return Math.max(sum, id);
        }, 0) + 1;
    }
}
