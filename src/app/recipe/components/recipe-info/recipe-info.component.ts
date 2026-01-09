import {
    Component,
    Signal,
    computed,
    effect,
    inject,
    input,
    signal,
    untracked,
} from '@angular/core';
import {RouterLink} from "@angular/router";

import {IIngredient, IRecipe} from 'app/models';
import {RecipeService} from 'app/recipe/services/recipe.service';

@Component({
    selector: 'app-recipe-info',
    templateUrl: './recipe-info.component.html',
    styleUrl: './recipe-info.component.css',
    imports: [
        RouterLink,
    ],
})
export class RecipeInfoComponent {
    protected readonly id = input<number, string>(NaN, {transform: Number});
    protected readonly recipe = signal<IRecipe | null>(null);
    protected readonly servings = signal<number>(1);
    protected readonly adjustedIngredients: Signal<IIngredient[]>;
    protected readonly ready = signal<boolean>(false);

    private readonly recipeService = inject(RecipeService);

    constructor() {
        this.adjustedIngredients = this.computeIngredientsOnServingsChange();

        this.loadRecipeOnIdChange();
    }

    protected onMoreClick(): void {
        this.servings.update((value: number): number => value + 1);
    }

    protected onLessClick(): void {
        this.servings.update((value: number): number => (value - 1) || value);
    }

    private loadRecipeOnIdChange(): void {
        effect(() => {
            const id: number = this.id();

            untracked(() => {
                if (Number.isNaN(id)) {
                    this.recipe.set(null);
                    return;
                }

                this.loadRecipe(id).finally();
            });
        });
    }

    private computeIngredientsOnServingsChange(): Signal<IIngredient[]> {
        return computed(() => {
            const ingredients: IIngredient[] = this.recipe()?.ingredients ?? [];
            const servings: number = this.servings();

            return untracked(() => ingredients.map((ingredient: IIngredient): IIngredient => ({
                ...ingredient,
                quantity: ingredient.quantity * servings,
            })));
        });
    }

    private async loadRecipe(id: number): Promise<void> {
        this.ready.set(false);

        const recipe: IRecipe | null = await this.recipeService.get(id);
        this.recipe.set(recipe);

        this.ready.set(true);
    }
}
