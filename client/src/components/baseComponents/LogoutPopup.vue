<template>
    <div class="tabletLandscape:ml-48 tablet:ml-6 tabletLandscape:w-6/12 absolute left-20 top-1/4 z-50 m-auto ml-96 h-fit w-9/12 rounded-2xl border-2 border-black bg-red-600 p-2 phone:left-0 phone:ml-10 computer:w-6/12">
      <p class="text-white">
        Are you sure you want to {{ text }}?
      </p>
      <div>
        <button @click.prevent="emit('confirm')">Confirm</button>
        <button @click.prevent="emit('cancel')">Cancel</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    text: string
  }

  defineProps<Props>()
  
  const emit = defineEmits(['cancel', 'confirm'])
  </script>