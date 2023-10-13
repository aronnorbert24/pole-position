<template>
  <button
    class="relative mt-4 border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-110 phone:w-20 phone:text-xs"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>
