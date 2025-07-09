// stores/uiStore.ts
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoginDialogOpen: false,
    isRegisterDialogOpen: false,
  }),
  actions: {
    openLoginDialog() {
      this.isLoginDialogOpen = true
      this.isRegisterDialogOpen = false // 
    },
    closeLoginDialog() {
      this.isLoginDialogOpen = false
    },
    openRegisterDialog() {
      this.isRegisterDialogOpen = true
      this.isLoginDialogOpen = false // 
    },
    closeRegisterDialog() {
      this.isRegisterDialogOpen = false
    },
  },
})