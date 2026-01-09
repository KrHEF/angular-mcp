import {IRecipe} from '../../models';

export const MOCK_RECIPES: IRecipe[] = [
    {
        id: 1,
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        imgUrl: '//placeholdmon.vercel.app/300x200.png?name=Spaghetti+Carbonara',
        isFavorite: true,
        ingredients: [
            {name: 'Spaghetti', quantity: 200, unit: 'g'},
            {name: 'Guanciale', quantity: 100, unit: 'g'},
            {name: 'Egg Yolks', quantity: 4, unit: 'each'},
            {name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g'},
            {name: 'Black Pepper', quantity: 1, unit: 'tsp'},
        ],
    },
    {
        id: 2,
        name: 'Caprese Salad',
        description: 'A simple and refreshing Italian salad.',
        imgUrl: '//placeholdmon.vercel.app/300x200.png?name=Caprese+Salad',
        ingredients: [
            {name: 'Tomatoes', quantity: 4, unit: 'each'},
            {name: 'Fresh Mozzarella', quantity: 200, unit: 'g'},
            {name: 'Fresh Basil', quantity: 1, unit: 'bunch'},
            {name: 'Extra Virgin Olive Oil', quantity: 2, unit: 'tbsp'},
        ],
    },
];
