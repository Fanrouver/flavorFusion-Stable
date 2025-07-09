// stores/authStore.ts
import { defineStore } from 'pinia';

interface User {
  id: number;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  // Simulasi SignIn dan SignUp
  actions: {
    async signUp(credentials: any) {
      console.log('Simulating Sign Up:', credentials);
    },
    async signIn(credentials: any) {
      console.log('Simulating Sign In:', credentials);
      // Simulasikan data user setelah login
      this.user = { id: 1, email: credentials.email };
    },
    async signOut() {
      console.log('Simulating Sign Out');
      this.user = null;
    },
    // fetchUser (belum ada fungsi selanjutnya)
    async fetchUser() {
      this.user = null;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});