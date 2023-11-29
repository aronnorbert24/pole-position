<template>
  <div class="phone:w-6/12 flex justify-end">
    <EditIcon @click="toggleComment('Edit')" />
    <DeleteIcon @click="deleteComment"/>
</div>
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
