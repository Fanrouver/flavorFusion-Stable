<template>
  <v-dialog v-model="uiStore.isRegisterDialogOpen" max-width="500" persistent>
     <v-card class="pa-4 pa-md-6">
        <v-card-title class="text-h4 font-weight-bold text-center mb-4">
          Create Account
        </v-card-title>
        
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="uiStore.closeRegisterDialog"
          style="position: absolute; top: 10px; right: 10px;"
        ></v-btn>

        <v-alert v-if="errorMessage" type="error" variant="tonal" density="compact" class="mb-4">
          {{ errorMessage }}
        </v-alert>
        <v-alert v-if="successMessage" type="success" variant="tonal" density="compact" class="mb-4">
          {{ successMessage }}
        </v-alert>
        <v-form v-if="!successMessage" v-model="valid" @submit.prevent="handleSignUp">
          <v-text-field v-model="fullName" :rules="fullNameRules" label="Full Name" prepend-inner-icon="mdi-account-outline" variant="outlined" required class="mb-4"></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="Email" prepend-inner-icon="mdi-email-outline" variant="outlined" required class="mb-4"></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'" label="Password" prepend-inner-icon="mdi-lock-outline" variant="outlined" required class="mb-4" @click:append-inner="showPassword = !showPassword"></v-text-field>
          <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" :type="showPassword ? 'text' : 'password'" label="Confirm Password" prepend-inner-icon="mdi-lock-check-outline" variant="outlined" required></v-text-field>

          <v-btn :loading="loading" :disabled="!valid" type="submit" color="primary" size="large" block class="mt-6">
            Sign Up
          </v-btn>
        </v-form>

        <div class="text-center mt-6">
          <p class="text-body-2">
            Already have an account?
            <a href="#" @click.prevent="switchToLogin" class="text-primary font-weight-bold text-decoration-none">Sign In</a>
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
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const fullNameRules = [(v: string) => !!v || 'Full Name is required'];
const emailRules = [(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'];
const passwordRules = [(v: string) => !!v || 'Password is required', (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters'];
const confirmPasswordRules = [(v: string) => v === password.value || 'Passwords do not match'];

async function handleSignUp() {
  if (!valid.value) return;
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  // Simulasi loading
  setTimeout(async () => {
    try {
      await authStore.signUp({ email: email.value, password: password.value });
      successMessage.value = 'Simulated registration successful!';
    } catch (error: any) {
      errorMessage.value = 'Simulated error.';
    } finally {
      loading.value = false;
    }
  }, 1500);
}

const switchToLogin = () => {
  uiStore.openLoginDialog();
};
</script>