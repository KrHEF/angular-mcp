export interface IIngredient {
    name: string
    quantity: number
    unit: string
}

export interface IRecipe {
    id: number
    name: string
    description: string
    imgUrl: string
    ingredients: IIngredient[]
    isFavorite?: boolean
}

export type IRecipeInfo = Pick<IRecipe, 'id' | 'name' | 'description' | 'isFavorite'>;
export type IRecipeList = IRecipeInfo[];
