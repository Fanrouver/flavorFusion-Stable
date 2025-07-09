<template>
  <v-dialog v-model="uiStore.isLoginDialogOpen" max-width="500" persistent>
    <v-card class="pa-4 pa-md-6">
      <v-card-title class="text-h4 font-weight-bold text-center mb-4">
        Sign In
      </v-card-title>
      <v-card-subtitle class="text-center mb-6">
        Welcome back to Flavor Fusion!
      </v-card-subtitle>
      
      <v-btn
        icon="mdi-close"
        variant="text"
        @click="uiStore.closeLoginDialog"
        style="position: absolute; top: 10px; right: 10px;"
      ></v-btn>

      <v-form v-model="valid" @submit.prevent="handleSignIn">
        
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          density="compact"
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          required
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          required
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>

        <div class="d-flex justify-end mb-4">
          <a href="#" class="text-body-2 text-primary text-decoration-none">Forgot Password?</a>
        </div>

        <v-btn
          :loading="loading"
          :disabled="!valid"
          type="submit"
          color="primary"
          size="large"
          block
        >
          Sign In
        </v-btn>
      </v-form>

      <div class="text-center mt-6">
        <p class="text-body-2">
          Don't have an account?
          <a href="#" @click.prevent="switchToRegister" class="text-primary font-weight-bold text-decoration-none">Sign Up</a>
        </p>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUiStore } from '~/stores/uiStore';
import { useAuthStore } from '~/stores/authStore';

const uiStore = useUiStore();
const authStore = useAuthStore();

const valid = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const emailRules = [ (v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid' ];
const passwordRules = [ (v: string) => !!v || 'Password is required' ];

async function handleSignIn() {
  if (!valid.value) return;
  loading.value = true;
  errorMessage.value = '';

  // Simulasi loading
  setTimeout(async () => {
    try {
      await authStore.signIn({ email: email.value, password: password.value });
      uiStore.closeLoginDialog();
    } catch (error: any) {
      errorMessage.value = 'Simulated error.';
    } finally {
      loading.value = false;
    }
  }, 1500);
}

const switchToRegister = () => {
  uiStore.openRegisterDialog();
};
</script>