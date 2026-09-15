import fruits from '../resources/fruits.png';
import vegetables from '../resources/vegetables.jpeg';
import milk from '../resources/milk.svg';
import fish from '../resources/fish.png';
import meat from '../resources/meat.png';
import poultry from '../resources/poultry.png';
import { slugify } from '../utils/format';

export const categories = [
  { name: 'Vegetables', description: 'Cabbage, Potato, Cucumber, Tomato, Garlic, Onion', icon: vegetables },
  { name: 'Fruits', description: 'Apples, Avocados, Banana, Mango, Grapes', icon: fruits },
  { name: 'Dairy Products', description: 'Milk, Cheese, Cottage cheese, Cream, Butter', icon: milk },
  { name: 'Seafood', description: 'Lobsters, Mussels, Snails, Oysters, Salmon', icon: fish },
  { name: 'Meat', description: 'Beef, Lamb, Pork', icon: meat },
  { name: 'Poultry', description: 'Chicken, Turkey, Duck, Goose', icon: poultry },
].map((category) => ({
  ...category,
  slug: slugify(category.name),
}));
