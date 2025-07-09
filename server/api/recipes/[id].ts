import { promises as fs } from 'fs';
import path from 'path';

interface RecipeData {
  recipes: { id: number; [key: string]: any }[];
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const recipeId = parseInt(id as string, 10);

  const filePath = path.join(process.cwd(), 'server', 'data', 'recipes.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const jsonData = JSON.parse(fileContent) as RecipeData;

  const recipe = jsonData.recipes.find(r => r.id === recipeId);

  if (!recipe) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' });
  }
  
  return recipe;
});