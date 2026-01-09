import {
    Component,
    OnInit,
    Signal,
    computed,
    inject,
    signal,
    untracked,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet, RouterLink} from '@angular/router';

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
        const recipes: IRecipeList = await this.recipeService.getList();
        this.recipes.set(recipes);
        this.ready.set(true);
    }
}
