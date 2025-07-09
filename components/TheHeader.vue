<template>
  <div>
    <v-app-bar class="d-flex align-center" app color="#FFCA28" flat>
      <v-app-bar-title class="font-weight-bold" @click="$router.push('/')">
        <v-icon color="teal-darken-2">mdi-pot-steam-outline</v-icon>
        Flavor Fusion
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-md-block">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          class="mx-1"
          text
        >
          {{ item.title }}
        </v-btn>
      </div>

      <div v-if="!isLoggedIn" class="d-none d-md-block ml-4 mr-4">
        <v-btn
          color="#26A69A"
          variant="flat"
          @click="uiStore.openLoginDialog()"
        >
          Sign In
        </v-btn>
      </div>
      
      <div v-else class="d-none d-md-block ml-4 mr-4">
        <span class="mr-3 text-body-2">Hi, {{ user?.email?.split('@')[0] }}</span>
        <v-btn
          color="#D50000"
          variant="flat"
          @click="handleSignOut"
        >
          Sign Out
        </v-btn>
      </div>
      
      <v-app-bar-nav-icon
        class="d-md-none mr-2"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          @click="drawer = false"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item v-if="!isLoggedIn" @click="uiStore.openLoginDialog(); drawer = false;">
          <v-btn color="teal-darken-2" variant="flat" block>Sign In</v-btn>
        </v-list-item>
        <div v-else class="pa-2">
            <p class="text-center text-body-3 mb-3">Hi, {{ user?.email }}</p>
            <v-btn
              color="#D50000"
              variant="flat"
              @click="handleSignOut"
              block
            >
              Sign Out
            </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUiStore } from '~/stores/uiStore';
import { useAuthStore } from '~/stores/authStore';

const uiStore = useUiStore();
const authStore = useAuthStore();
const { isLoggedIn, user } = storeToRefs(authStore);

const drawer = ref(false);

const menuItems = ref([
  { title: 'HOME', to: '/' },
  { title: 'RECIPES', to: '/recipes' },
  { title: 'ABOUT', to: '/about' },
]);

async function handleSignOut() {
  await authStore.signOut();
  drawer.value = false; // Tutup drawer jika logout dari mobile
}
</script>

<style scoped>
.v-app-bar-title {
  cursor: pointer;
}
</style>