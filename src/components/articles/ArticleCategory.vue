<template>
  <div class="mb-5 ml-5 mr-5 flex justify-between phone:ml-8">
    <F1Icon :class="getCategoryClass('F1')" @click="updateCategory('F1')" />
    <F2Icon :class="getCategoryClass('F2')" @click="updateCategory('F2')" />
    <F3Icon :class="getCategoryClass('F3')" @click="updateCategory('F3')" />
    <WecIcon :class="getCategoryClass('WEC')" @click="updateCategory('WEC')" />
    <MotogpIcon :class="getCategoryClass('MotoGP')" @click="updateCategory('MotoGP')" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'

interface Props {
  category: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateNewCategory', category: string): void
}>()

const updatedCategory = ref(props.category)

function getCategoryClass(category: string) {
  return category === updatedCategory.value ? 'bg-red-600' : 'bg-white'
}

function updateCategory(category: string) {
  updatedCategory.value = category
  emit('updateNewCategory', updatedCategory.value)
}
</script>
