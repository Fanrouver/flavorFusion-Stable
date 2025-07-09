<template>
  <v-app>
    
    <TheHeader />

    <v-main>
      <slot />
    </v-main>

    <LoginDialog />
    <RegisterDialog />
  </v-app>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();

// Coba ambil data user saat aplikasi dimuat di sisi client
onMounted(() => {
  authStore.fetchUser();
});
</script>