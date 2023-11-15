<template>
  <div class="mb-12 mt-6 h-8 w-full computer:flex computer:items-center">
    <div class="mb-4 flex h-8 w-full items-center phone:w-full">
      <button
        v-for="property in sortProperties"
        :key="property"
        class="border-px ml-4 flex h-8 w-fit justify-center rounded-lg font-header text-sm font-semibold leading-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:border-black hover:bg-black hover:text-white phone:px-3"
        :class="getPropertyClass(property)"
        @click="toggleActiveSort(property)"
      >
        {{ property }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'sortComments', property: string): void
}>()

const sortProperties: string[] = ['Oldest', 'Newest', 'Best']
const activeSort = ref('Oldest')

function getPropertyClass(property: string) {
  return activeSort.value === property ? 'border-red-600 bg-red-600 text-white' : 'border-black bg-white text-black'
}

function toggleActiveSort(priority: string) {
  activeSort.value = priority
  emit('sortComments', activeSort.value)
}
</script>
