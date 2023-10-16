<template>
  <div class="border-2 border-red-600"></div>
  <p class="mb-5 text-left text-base font-bold">{{ title }}</p>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
