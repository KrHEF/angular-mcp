import {
    Component,
    Signal,
    computed,
    input,
    signal,
    untracked,
} from '@angular/core';

import {IIngredient, IRecipe} from 'app/models';

@Component({
    selector: 'app-recipe-info',
    templateUrl: './recipe-info.component.html',
    styleUrl: './recipe-info.component.css',
    imports: [],
})
export class RecipeInfoComponent {
    public readonly recipe = input.required<IRecipe>();

    protected readonly servings = signal<number>(1);
    protected readonly adjustedIngredients: Signal<IIngredient[]>;

    constructor() {
        this.adjustedIngredients = computed(() => {
            const ingredients: IIngredient[] = this.recipe().ingredients;
            const servings: number = this.servings();

            return untracked(() => ingredients.map((ingredient: IIngredient): IIngredient => ({
                ...ingredient,
                quantity: ingredient.quantity * servings,
            })));
        });
    }

    protected onMoreClick(): void {
        this.servings.update((value: number): number => value + 1);
    }

    protected onLessClick(): void {
        this.servings.update((value: number): number => (value - 1) || value);
    }
}
