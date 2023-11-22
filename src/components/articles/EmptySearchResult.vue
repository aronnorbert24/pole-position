<template>
  <TitleSeparator class="mx-auto mt-10 computer:w-9/12" :title="title" />
  <div class="mb-5 h-32 rounded-xl bg-white text-center">
    <p class="pt-12 text-2xl font-semibold text-slate-500">There are no articles including this search term.</p>
  </div>
</template>

<script setup lang="ts">
import TitleSeparator from '../baseComponents/TitleSeparator.vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>
