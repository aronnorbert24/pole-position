<template>
  <RedRectangle />
  <div class="ml-40 mr-5 flex justify-between phone:ml-8">
    <IconLinks />
    <ButtonLinks class="phone:hidden" @showCreate="showCreate" />
  </div>
  <RedRectangle class="computer:hidden" />
  <ButtonLinks class="computer:hidden" @showCreate="showCreate" />
</template>

<script setup lang="ts">
import RedRectangle from '../baseComponents/RedLinkRectangle.vue'
import ButtonLinks from '../baseComponents/ButtonLinks.vue'
import IconLinks from '../baseComponents/IconLinks.vue'
const emit = defineEmits(['showCreate'])

function showCreate() {
  emit('showCreate')
}
</script>
