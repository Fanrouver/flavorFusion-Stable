<!-- pages/index.vue -->
<template>
  <!-- 
    v-sheet digunakan sebagai wrapper untuk memastikan tidak ada margin yang tidak diinginkan.
    <v-img> adalah komponen utama untuk membuat hero section ini.
  -->
  <v-sheet>
    <v-img
      src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
      cover
      gradient="to top right, rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.7)"
      class="d-flex align-center text-white text-center"
      min-height="calc(100vh - 64px)"
    >
      <!-- Konten akan diletakkan di tengah secara vertikal dan horizontal -->
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <!-- Judul Utama -->
            <h1 class="text-h2 font-weight-black mb-4" style="line-height: 1.2;">
              Welcome to Flavor Fusion
            </h1>

            <!-- Sub-judul / Deskripsi -->
            <h2 class="text-h5 font-weight-light mb-8">
              Your daily source for delicious, easy-to-follow recipes from around the world. Unleash your inner chef.
            </h2>

            <!-- Tombol Call to Action -->
            <v-btn
              color="primary"
              size="x-large"
              to="/recipes"
              variant="flat"
              class="font-weight-bold"
            >
              Explore Recipes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-sheet>
</template>

<script setup lang="ts">
// Mengatur SEO Meta untuk halaman utama
useSeoMeta({
  title: 'Flavor Fusion - Your Culinary Companion',
  description: 'Discover thousands of recipes, from quick weeknight meals to gourmet dishes. Start your cooking adventure with Flavor Fusion.',
  ogTitle: 'Flavor Fusion - Your Culinary Companion',
  ogDescription: 'Discover thousands of recipes, from quick weeknight meals to gourmet dishes. Start your cooking adventure with Flavor Fusion.',
  // Anda bisa menambahkan ogImage jika punya gambar spesifik untuk social media
  // ogImage: 'https://example.com/social-image.png',
});
</script>

<style scoped>
/* Anda bisa menambahkan styling kustom di sini jika diperlukan */
h1, h2 {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}
</style>