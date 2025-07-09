// composables/useRecipes.ts

export const useRecipes = () => {
  interface Recipe {
    id: number;
    name: string;
    image: string;    
    cuisine: string;
    difficulty: string;
    tags: string[];
  }

  // Mengambil data resep 
  const { data: recipes, pending, error } = useAsyncData<Recipe[]>(
    'recipes',
    () => $fetch<Recipe[]>('/api/recipes')
  );

  // --- PERUBAHAN DI SINI: Gunakan useState ---

  type FilterType = 'tags' | 'cuisine' | 'difficulty';

  // Buat state yang persisten menggunakan useState
  const filterType = useState<FilterType>('recipe-filter-type', () => 'tags');
  const selectedValue = useState<string | null>('recipe-filter-value', () => null);
  const page = useState<number>('recipe-page', () => 1);
  
  // --- Sisa logika tidak banyak berubah ---

  const availableOptions = computed(() => {
    if (!recipes.value) return [];
    
    let allValues: string[] = [];
    switch (filterType.value) {
      case 'tags':
        allValues = recipes.value.flatMap(recipe => recipe.tags);
        break;
      case 'cuisine':
        allValues = recipes.value.map(recipe => recipe.cuisine);
        break;
      case 'difficulty':
        allValues = recipes.value.map(recipe => recipe.difficulty);
        break;
    }
    return [...new Set(allValues)];
  });

  const filteredRecipes = computed(() => {
    if (!recipes.value) return [];
    if (!selectedValue.value) {
      return recipes.value;
    }
    
    return recipes.value.filter(recipe => {
      switch (filterType.value) {
        case 'tags':
          return recipe.tags.includes(selectedValue.value as string);
        case 'cuisine':
          return recipe.cuisine === selectedValue.value;
        case 'difficulty':
          return recipe.difficulty === selectedValue.value;
        default:
          return true;
      }
    });
  });

  // --- FUNGSI KONTROL FILTER (tidak berubah) ---

  function setFilterType(type: FilterType) {
    filterType.value = type;
    selectedValue.value = null;
    page.value = 1;
  }

  function setSelectedValue(value: string | null) {
    selectedValue.value = value;
    page.value = 1;
  }

  // --- LOGIKA PAGINATION (sekarang menggunakan page dari useState) ---
  const itemsPerPage = 9;
  const totalPages = computed(() => Math.ceil(filteredRecipes.value.length / itemsPerPage));
  const paginatedRecipes = computed(() => {
    const startIndex = (page.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRecipes.value.slice(startIndex, endIndex);
  });
  
  return {
    pending,
    error,
    page,
    totalPages,
    paginatedRecipes,
    filterType,
    selectedValue,
    availableOptions,
    setFilterType,
    setSelectedValue,
  };
};