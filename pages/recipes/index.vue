<template>
  <div>
    <h1 class="text-h3 font-weight-bold text-center mb-8">Explore Our Recipes</h1>

    <div v-if="pending" class="text-center">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Loading delicious recipes...</p>
    </div>

    <div v-else-if="error" class="text-center">
      <v-alert type="error" variant="tonal">
        Sorry, we couldn't load the recipes. Please try again later.
      </v-alert>
    </div>

    <div v-else>
      <v-card variant="tonal" class="pa-4 mb-8">
        <div class="text-subtitle-1 font-weight-bold mb-3 text-center">Filter By Category:</div>
        
        <div class="d-flex justify-center">
          <v-btn-toggle
            :model-value="filterType"
            @update:model-value="setFilterType"
            color="primary"
            variant="outlined"
            density="compact"
            divided
            :stacked="smAndDown" 
          >
            <v-btn value="tags">Tags</v-btn>
            <v-btn value="cuisine">Cuisine</v-btn>
            <v-btn value="difficulty">Difficulty</v-btn>
          </v-btn-toggle>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="text-subtitle-1 font-weight-bold mb-3 text-center">Select Option:</div>
        <v-slide-group v-model="selectedValue" show-arrows>
          <v-slide-group-item
            v-for="option in ['All', ...availableOptions]"
            :key="option"
            :value="option === 'All' ? null : option"
            v-slot="{ isSelected, toggle }"
          >
            <v-btn
              class="ma-2"
              rounded
              :color="isSelected ? 'primary' : 'default'"
              @click="toggle"
            >
              {{ option }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
      </v-card>

      <v-row>
        <v-col v-for="recipe in paginatedRecipes" :key="recipe.id" cols="12" sm="6" md="4">
          <v-card class="mx-auto" height="100%">
            <v-img :src="recipe.image" height="200px" cover :alt="recipe.name"></v-img>
            <v-card-title class="font-weight-bold">{{ recipe.name }}</v-card-title>
            <v-card-subtitle>{{ recipe.cuisine }} | Difficulty: {{ recipe.difficulty }}</v-card-subtitle>
            <v-card-text>
              <v-chip v-for="innerTag in recipe.tags.slice(0, 2)" :key="innerTag" class="mr-2 mb-2" size="small">{{ innerTag }}</v-chip>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" :to="`/recipes/${recipe.id}`">View Recipe</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      
      <div v-if="!pending && paginatedRecipes.length === 0" class="text-center text-medium-emphasis my-8">
        No recipes found with the selected filter.
      </div>

      <v-pagination v-if="totalPages > 1" v-model="page" :length="totalPages" class="my-8"></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const { 
  pending, 
  error, 
  page, 
  totalPages, 
  paginatedRecipes,
  filterType,
  selectedValue,
  availableOptions,
  setFilterType,
} = useRecipes();

watch(selectedValue, () => {
  page.value = 1;
});

useSeoMeta({
  title: 'Explore Our Recipes - Flavor Fusion',
  description: 'Find your next favorite meal from our collection of delicious and easy-to-follow recipes.',
});
</script>