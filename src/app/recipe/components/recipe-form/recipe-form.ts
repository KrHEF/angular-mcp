import {Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {ControlError} from 'app/shared/components/control-error/control-error';
import {RecipeService} from 'app/recipe/services/recipe.service';
import {IRecipe} from 'app/models';

import {
    IRecipeForm,
    getIngredientsFormGroup,
    getRecipeFormGroup,
} from './recipe-form.config';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.html',
    styleUrl: './recipe-form.css',
    imports: [
        ReactiveFormsModule,
        ControlError
    ],
})
export class RecipeForm {
    protected readonly $class = 'recipe-form';
    protected readonly form: FormGroup<IRecipeForm> = getRecipeFormGroup();

    private readonly recipeService = inject(RecipeService);
    private readonly router = inject(Router);

    protected addIngredient(): void {
        this.form.controls.ingredients.push(getIngredientsFormGroup());
    }

    protected deleteIngredient(index: number): void {
        this.form.controls.ingredients.removeAt(index);
    }

    protected async onSubmit(): Promise<void> {
        if (this.form.invalid) return;

        const value = this.form.getRawValue();
        const newRecipe: IRecipe = await this.recipeService.add({
            name: value.name!,
            description: value.description!,
            ingredients: value.ingredients!.map(ingredient => ({
                name: ingredient.name!,
                quantity: Number(ingredient.quantity!),
                unit: ingredient.unit!,
            })),
        });

        this.router.navigate(['recipes', newRecipe.id]);
    }
}
