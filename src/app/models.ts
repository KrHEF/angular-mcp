export type TUnit =
    | 'bunch'
    | 'g'
    | 'each'
    | 'tsp'
    | 'tbsp'
    ;

export interface IIngredient {
    name: string
    quantity: number
    unit: TUnit
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
