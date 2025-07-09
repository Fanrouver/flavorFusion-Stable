<!-- pages/about.vue -->
<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Judul Halaman -->
        <h1 class="text-h3 font-weight-bold text-center mb-4">
          About Flavor Fusion
        </h1>
        <p class="text-h6 text-center text-medium-emphasis font-weight-light mb-8">
          Celebrating the art of cooking, one delicious recipe at a time.
        </p>

        <v-divider class="my-8"></v-divider>

        <!-- Bagian Misi Kami -->
        <section class="mb-10">
          <h2 class="text-h4 font-weight-medium mb-4">Our Mission</h2>
          <p class="text-body-1">
            At Flavor Fusion, our mission is simple: to inspire joy and creativity in the kitchen. We believe that cooking should be an accessible and rewarding experience for everyone, from the novice cook to the seasoned chef. We provide reliable, delicious, and easy-to-follow recipes that bring people together around the dinner table.
          </p>
        </section>

        <!-- Bagian Tim Kami -->
        <section class="mb-10">
          <h2 class="text-h4 font-weight-medium mb-4 text-center">Meet the Team</h2>
          <v-row>
            <v-col
              v-for="member in team"
              :key="member.name"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="text-center" flat>
                <v-avatar size="120" class="my-4">
                  <v-img :src="member.avatar" :alt="member.name"></v-img>
                </v-avatar>
                <v-card-title class="justify-center">{{ member.name }}</v-card-title>
                <v-card-subtitle>{{ member.role }}</v-card-subtitle>
                <v-card-text class="text-medium-emphasis">
                  {{ member.bio }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </section>
        
        <v-divider class="my-8"></v-divider>

        <!-- Bagian Call to Action -->
        <section class="text-center py-8">
          <h2 class="text-h4 font-weight-medium mb-4">Ready to Cook?</h2>
          <p class="text-body-1 mb-6">
            Explore our collection of recipes and find your next favorite meal.
          </p>
          <v-btn color="primary" size="large" to="/recipes" variant="flat">
            Explore Recipes
          </v-btn>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mengatur SEO Meta untuk halaman ini
useSeoMeta({
  title: 'About Us - Flavor Fusion',
  description: 'Learn more about the mission and the team behind Flavor Fusion, your favorite place for delicious recipes.',
});

// Data dummy untuk tim
const team = ref([
  {
    name: 'Akbar',
    role: 'Founder & Head Chef',
    avatar: 'https://placehold.co/128x128/E1F5FE/0277BD?text=A',
    bio: 'With over 15 years of culinary experience, Akbar leads our kitchen with passion and creativity.'
  },
  {
    name: 'Aryasatya',
    role: 'Food Photographer',
    avatar: 'https://placehold.co/128x128/E8F5E9/2E7D32?text=A',
    bio: 'Arya captures the beauty of our dishes, making them as delightful to see as they are to eat.'
  },
  {
    name: 'Attallah',
    role: 'Community Manager',
    avatar: 'https://placehold.co/128x128/FFF3E0/E65100?text=A',
    bio: 'Atta connects with our community, sharing tips and celebrating your culinary creations.'
  }
]);
</script>

<style scoped>
/* Styling spesifik untuk halaman ini jika diperlukan */
.v-card-title {
  font-size: 1.1rem;
}
</style>