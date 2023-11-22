<template>
  <div class="mb-5 ml-5 mr-5 flex justify-between phone:ml-8">
    <div v-for="category in categories" :key="category.title">
      <component
        :is="category.icon"
        :class="getCategoryClass(category.title)"
        @click="updateCategory(category.title)"
      ></component>
    </div>
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

const categories = [
  {
    icon: F1Icon,
    title: 'F1',
  },
  {
    icon: F2Icon,
    title: 'F2',
  },
  {
    icon: F3Icon,
    title: 'F3',
  },
  {
    icon: WecIcon,
    title: 'WEC',
  },
  {
    icon: MotogpIcon,
    title: 'MotoGP',
  },
]
const updatedCategory = ref(props.category)

function getCategoryClass(category: string) {
  return category === updatedCategory.value ? 'bg-red-600' : 'bg-white'
}

function updateCategory(category: string) {
  updatedCategory.value = category
  emit('updateNewCategory', updatedCategory.value)
}
</script>
