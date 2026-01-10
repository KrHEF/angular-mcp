import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export interface IRecipeForm {
    name: FormControl<string | null>
    description: FormControl<string | null>
    ingredients: FormArray<FormGroup<IIngredientForm>>
}

export interface IIngredientForm {
    name: FormControl<string | null>
    quantity: FormControl<string | null>
    unit: FormControl<string | null>
}

export function getRecipeFormGroup(): FormGroup<IRecipeForm> {
    const fb = new FormBuilder();
    return fb.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        ingredients: fb.array([
            getIngredientsFormGroup(),
        ]),
    })
}

export function getIngredientsFormGroup(): FormGroup<IIngredientForm> {
    return new FormGroup<IIngredientForm>({
        name: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        unit: new FormControl('', [Validators.required]),
    });
}
