<template>
  <button
    class="ml-4 h-12 w-16 transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
    @click.prevent="toggleComment('Edit')"
  >
    <EditIcon />
  </button>
  <button
    class="ml-4 h-12 w-16 transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
    @click.prevent="deleteComment"
  >
    <DeleteIcon />
  </button>
</template>

<script setup lang="ts">
import DeleteIcon from '../icons/DeleteIcon.vue'
import EditIcon from '../icons/EditIcon.vue'

const emit = defineEmits<{
  (e: 'toggleComment', category: string): void
  (e: 'deleteComment'): void
}>()

function toggleComment(category: string) {
  emit('toggleComment', category)
}

function deleteComment() {
  emit('deleteComment')
}
</script>
