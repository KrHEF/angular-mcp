import {
    Component,
    DestroyRef,
    OnInit,
    Signal,
    computed,
    inject,
    signal,
    untracked,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {RouterOutlet, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

import {IRecipeList} from 'app/models';
import {RecipeService} from 'app/recipe/services/recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [
        FormsModule,
        RouterOutlet,
        RouterLink,
        MatButton,
    ],
    host: {
        '[class]': '$class',
    },
})
export class RecipeList implements OnInit {
    protected readonly recipes = signal<IRecipeList>([]);
    protected readonly searchTerm = signal<string>('');
    protected readonly filteredRecipes: Signal<IRecipeList>;
    protected readonly ready = signal<boolean>(false);
    protected readonly $class = 'recipe-list';

    private readonly recipeService = inject(RecipeService);
    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        this.filteredRecipes = computed(() => {
            const search: string = this.searchTerm();
            const recipes: IRecipeList = this.recipes();

            return untracked(() => recipes.filter((recipe => recipe.name.includes(search))));
        });
    }

    public ngOnInit(): void {
        this.loadRecipeList();
    }

    private async loadRecipeList(): Promise<void> {
        this.recipeService.list$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((recipes: IRecipeList) => {
                this.recipes.set(recipes);
            })

        await this.recipeService.getList();
        this.ready.set(true);
    }
}
