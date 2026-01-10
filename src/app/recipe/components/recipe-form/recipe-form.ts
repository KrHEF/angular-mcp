import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

import {ControlError} from 'app/shared/components/control-error/control-error';

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

    protected addIngredient(): void {
        this.form.controls.ingredients.push(getIngredientsFormGroup());
    }

    protected deleteIngredient(index: number): void {
        this.form.controls.ingredients.removeAt(index);
    }

    protected onSubmit(): void {
        console.log(this.form.value);
    }
}
