<template>
  <div>
    <NuxtPage />
    <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
      <TransitionGroup name="alert">
        <div key="test"
          class="fixed top-3 z-10 right-3 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          :class="alertStore.getAlert.error ? 'text-red-800 bg-red-50 dark:text-red-400' : ''" role="alert"
          v-if="alertStore.getAlert.text">
          {{ alertStore.getAlert.text }}
        </div>
      </TransitionGroup>
      <div class=" h-full">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>



<script setup>
import "@/assets/scss/admin.css";

import { useAlertStore } from '@/store/alert';
const alertStore = useAlertStore()
</script>