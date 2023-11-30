<template>
  <div class="mt-36 bg-red-600 px-16 pb-4 align-bottom phone:px-4">
    <div class="flex justify-between">
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">F1</p>
        <RouterLink to="/pole-position/category/F1"><F1Icon class="ml-4 bg-white phone:ml-8" /></RouterLink>
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">F2</p>
        <RouterLink to="/pole-position/category/F2"><F2Icon class="ml-4 bg-white" /></RouterLink>
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">F3</p>
        <RouterLink to="/pole-position/category/F3"><F3Icon class="ml-4 bg-white phone:mr-10" /></RouterLink>
      </div>
    </div>
    <div class="mt-10 flex justify-between">
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">WEC</p>
        <RouterLink to="/pole-position/category/WEC"><WecIcon class="ml-4 bg-white" /></RouterLink>
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">MotoGP</p>
        <RouterLink to="/pole-position/category/MotoGP"><MotogpIcon class="ml-4 bg-white phone:mr-10" /></RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'

</script>
