<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

// 1. Panggil composable dengan ID dari URL
const { recipe, pending, error } = useRecipeDetail(id);

// 2. SEO Meta tetap di sini
useSeoMeta({
  title: () => `${recipe.value?.name || 'Recipe'} - Flavor Fusion`,
  description: () => `Learn how to cook ${recipe.value?.name}. Find the ingredients and step-by-step instructions here.`,
});
</script>

<template>
  <div>
    <div v-if="pending" class="text-center py-16">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Fetching recipe details...</p>
    </div>
    <div v-else-if="error || !recipe" class="text-center py-16">
      <v-alert type="error" variant="tonal" class="mx-auto" max-width="500">
        <h2>Recipe Not Found</h2>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
        <v-btn to="/recipes" color="primary" class="mt-4">Back to Recipes</v-btn>
      </v-alert>
    </div>
    <v-container v-else>
      <v-row>
        <v-col cols="12" md="6">
          <v-img :src="recipe.image" :alt="recipe.name" class="rounded-lg" cover aspect-ratio="1"></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="text-h3 font-weight-bold mb-2">{{ recipe.name }}</h1>
          <div class="d-flex align-center mb-4">
            <v-rating :model-value="recipe.rating" color="amber" density="compact" half-increments readonly size="small"></v-rating>
            <div class="text-grey ms-2">{{ recipe.rating }} ({{ recipe.reviewCount }} reviews)</div>
          </div>
          <div class="mb-6">
            <v-chip class="mr-2 mb-2" color="primary" variant="tonal"><v-icon start>mdi-silverware-fork-knife</v-icon>{{ recipe.cuisine }}</v-chip>
            <v-chip class="mr-2 mb-2"><v-icon start>mdi-clock-time-eight-outline</v-icon>{{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} min</v-chip>
            <v-chip class="mr-2 mb-2"><v-icon start>mdi-fire</v-icon>{{ recipe.caloriesPerServing }} kcal</v-chip>
          </div>
          <h2 class="text-h5 font-weight-medium mb-3">Ingredients</h2>
          <v-list density="compact" class="mb-6">
            <v-list-item v-for="(ingredient, i) in recipe.ingredients" :key="i">
              <template v-slot:prepend><v-icon color="primary">mdi-circle-small</v-icon></template>
              <v-list-item-title>{{ ingredient }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-divider class="my-8"></v-divider>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <h2 class="text-h4 font-weight-medium mb-4 text-center">Instructions</h2>
          <v-timeline align="start" side="end">
            <v-timeline-item v-for="(instruction, i) in recipe.instructions" :key="i" dot-color="primary" size="small">
              <div class="d-flex">
                <strong class="me-4">Step {{ i + 1 }}</strong>
                <div>{{ instruction }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>