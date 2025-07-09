// composables/useRecipeDetail.ts

// Definisikan tipe data di sini
interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

// Composable ini menerima 'id' sebagai parameter
export const useRecipeDetail = (id: string | string[]) => {
  // Gunakan ID untuk membuat kunci unik untuk useAsyncData
  const { data: recipe, pending, error } = useAsyncData<Recipe>(
    `recipe-${id}`,
    () => $fetch<Recipe>(`/api/recipes/${id}`)
  );

  // Kembalikan semua state yang dibutuhkan oleh halaman
  return {
    recipe,
    pending,
    error
  };
};