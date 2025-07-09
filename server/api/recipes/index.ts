import { promises as fs } from 'fs';
import path from 'path';

interface RecipeData {
  recipes: any[];
}

export default defineEventHandler(async (event) => {
  try {
    const filePath = path.join(process.cwd(), 'server', 'data', 'recipes.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent) as RecipeData;
    return jsonData.recipes;
  } catch (error) {
    console.error('SERVER ERROR - Could not read local recipe data:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load recipe data from server.',
    });
  }
});