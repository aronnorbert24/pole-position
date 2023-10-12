<template>
  <div class="absolute ml-96 left-20 top-1/4 z-50 m-auto h-fit w-6/12 rounded-2xl border-2 border-black bg-white p-2">
    <div class="flex justify-between mb-10">
      <div class="flex justify-content">
      <div class="w-8 h-8" @click="toggleChampionship">
        <p class="text-2xl">F1</p>
      </div>
      <div class="w-8 h-8 ml-10 justify-normal" @click="toggleChampionship">
        <p class="text-2xl">MotoGP</p>
      </div>
    </div>
      <div class="w-8 h-8 hover:cursor-pointer hover:text-slate-400" @click="closeChampionship">
        <p class="text-4xl">&times;</p>
      </div>
    </div>
    <p v-if="isF1ChampionshipShowing" class="text-2xl">{{ textf1 }}</p>
    <p v-if="isMotoGPChampionshipShowing" class="text-2xl">{{ textmotogp }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    textf1: string,
    textmotogp: string
  }

  defineProps<Props>()

  const emit = defineEmits(['closeChampionship'])

  const isMotoGPChampionshipShowing = ref(false)
  const isF1ChampionshipShowing = ref(true)

  function toggleChampionship() {
    isMotoGPChampionshipShowing.value = !isMotoGPChampionshipShowing.value
    isF1ChampionshipShowing.value = !isF1ChampionshipShowing.value
  }

  function closeChampionship() {
    emit('closeChampionship')
  }

</script>