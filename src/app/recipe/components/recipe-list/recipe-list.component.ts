import {
    Component,
    OnInit,
    computed,
    inject,
    signal,
} from '@angular/core';

import {IRecipe, IRecipeList} from 'app/models';
import {RecipeService} from 'app/recipe/services/recipe.service';
import {RecipeInfoComponent} from "../recipe-info/recipe-info.component";

const enum PageState {
    PageInit,
    RecipeListReady,
    RecipeLoading,
    RecipeReady,
    RecipeError,
}

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [
        RecipeInfoComponent,
    ],
    host: {
        '[class]': '$class',
    },
})
export class RecipeList implements OnInit {
    protected readonly recipes = signal<IRecipeList>([]);
    protected readonly recipe = signal<IRecipe | null>(null);
    protected readonly isRecipeListReady = computed<boolean>(() => this.pageState() === PageState.RecipeListReady);
    protected readonly isRecipeLoading = computed<boolean>(() => this.pageState() === PageState.RecipeLoading);
    protected readonly isRecipeError = computed<boolean>(() => this.pageState() === PageState.RecipeError);
    protected readonly $class = 'recipe-list';

    private readonly pageState = signal<PageState>(PageState.PageInit)

    private readonly recipeService = inject(RecipeService);

    public ngOnInit(): void {
        this.loadRecipeList();
    }

    protected onShowRecipeClick(id: number): void {
        this.loadRecipe(id).finally();
    }

    private async loadRecipeList(): Promise<void> {
        const recipes: IRecipeList = await this.recipeService.getList();
        this.recipes.set(recipes);
        this.pageState.set(PageState.RecipeListReady);
    }

    private async loadRecipe(id: number): Promise<void> {
        this.pageState.set(PageState.RecipeLoading);

        const recipe: IRecipe | null = await this.recipeService.get(id);
        this.recipe.set(recipe);

        this.pageState.set(recipe ? PageState.RecipeReady : PageState.RecipeError);
    }
}
