import {
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    signal,
    untracked,
} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {map, startWith} from 'rxjs';

import {errorMessages} from './control-error.config';

@Component({
    selector: 'app-control-error',
    template: '@if (shouldShowError) { {{error()}} }',
    styleUrl: './control-error.css',
    imports: [],
})
export class ControlError {
    public readonly control = input.required<AbstractControl>();

    protected readonly error = signal<string | null>(null);

    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        effect(() => {
            const control = this.control();
            untracked(() => {
                control.statusChanges
                    .pipe(
                        startWith(control.status),
                        map(() => control.errors),
                        takeUntilDestroyed(this.destroyRef),
                    )
                    .subscribe(this.setError.bind(this));
            });
        });
    }

    protected get shouldShowError(): boolean {
        const control = this.control();
        return control.invalid && (control.dirty || control.touched);
    }

    private setError(errors: ValidationErrors | null): void {
        this.error.set(this.getErrorMessage(errors));
    }

    private getErrorMessage(errors: ValidationErrors | null): string | null {
        if (!errors) return null;
        if (errors['required']) return errorMessages.required;
        return errorMessages.default;
    }
}
