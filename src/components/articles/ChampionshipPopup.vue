<template>
  <div
    class="absolute top-1/4 z-50 m-auto h-fit w-6/12 rounded-2xl border-2 border-black bg-white p-2 phone:ml-12 phone:w-9/12 computer:left-20 computer:ml-96"
  >
    <div class="mb-10 flex justify-between">
      <div class="justify-content flex">
        <div class="h-8 w-8" @click="toggleF1Championship">
          <p class="text-2xl hover:cursor-pointer hover:text-slate-400 phone:text-xl">F1</p>
        </div>
        <div
          class="ml-10 h-8 w-8 hover:cursor-pointer hover:text-slate-400 phone:ml-6"
          @click="toggleMotogpChampionship"
        >
          <p class="text-2xl phone:text-xl">MotoGP</p>
        </div>
      </div>
      <div class="h-8 w-8 hover:cursor-pointer hover:text-slate-400" @click="closeChampionship">
        <p class="text-4xl">&times;</p>
      </div>
    </div>
    <p v-if="isF1ChampionshipShowing" class="text-2xl phone:text-xl">{{ textf1 }}</p>
    <p v-if="isMotoGPChampionshipShowing" class="text-2xl phone:text-xl">{{ textmotogp }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  textf1: string
  textmotogp: string
}

defineProps<Props>()

const emit = defineEmits(['closeChampionship'])

const isMotoGPChampionshipShowing = ref(false)
const isF1ChampionshipShowing = ref(true)

function toggleF1Championship() {
  isMotoGPChampionshipShowing.value = false
  isF1ChampionshipShowing.value = true
}

function toggleMotogpChampionship() {
  isMotoGPChampionshipShowing.value = true
  isF1ChampionshipShowing.value = false
}

function closeChampionship() {
  emit('closeChampionship')
}
</script>
