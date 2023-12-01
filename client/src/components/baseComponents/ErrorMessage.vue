<template>
    <div v-if="error" class="mx-2 mt-4 rounded-lg bg-red-300 text-center font-header text-sm font-semibold text-red-600">
      {{ error }}
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    error: string
  }
  
  defineProps<Props>()
  </script>