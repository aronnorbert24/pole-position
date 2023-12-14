<template>
  <div class="phone:w-6/12 flex justify-end">
    <EditIcon @click="toggle('Edit')" />
    <DeleteIcon @click="toDelete"/>
</div>
</template>

<script setup lang="ts">
import DeleteIcon from '../icons/DeleteIcon.vue'
import EditIcon from '../icons/EditIcon.vue'

const emit = defineEmits<{
  (e: 'toggle', category: string): void
  (e: 'delete'): void
}>()

function toggle(category: string) {
  emit('toggle', category)
}

function toDelete() {
  emit('delete')
}
</script>
