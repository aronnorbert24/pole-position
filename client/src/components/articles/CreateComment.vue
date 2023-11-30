<template>
  <div class="flex">
    <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="loggedInUserPicture" />
    <textarea
      type="text"
      maxlength="500"
      class="ml-8 h-24 w-10/12 rounded-2xl border-black bg-slate-300 pl-2 text-left text-lg font-medium text-black"
      :placeholder="updatedComment.body"
      v-model="updatedComment.body"
    ></textarea>
  </div>
  <div class="flex">
    <button
      class="ml-auto mr-6 mt-4 h-12 w-14 rounded-2xl bg-red-600 pr-24 text-white transition-transform ease-in-out hover:scale-110 hover:cursor-pointer computer:mr-14"
      @click="save"
    >
      Comment
    </button>
    <button
      class="mr-4 mt-4 h-12 w-14 rounded-2xl bg-gray-300 pr-20 text-red-600 transition-transform ease-in-out hover:scale-110 hover:cursor-pointer"
      @click="cancelComment"
    >
      <p class="pb-1 font-header text-lg font-semibold">Cancel</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useCommentStore } from '../../stores/CommentStore';
import { useUserStore } from '../../stores/UserStore';
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

const route = useRoute()
const { singleComment } = storeToRefs(useCommentStore())
const { saveComment, editComment } = useCommentStore()
const { loggedInUserPicture } = useUserStore()


interface Props {
  comment: string
  user: User
  userId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancelComment'): void
}>()

const updatedComment = ref<Comment>({
      articleId: 0,
      userId: '',
      commentId: 0,
      parentId: 0,
      replies: [] as Comment[],
      body: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
      date: new Date(),
      likes: 0,
      likedBy: [],
    })


function save() {
  if (!updatedComment.value.body.length) {
    return
  }

  if (!updatedComment.value.commentId) {
    updatedComment.value.articleId = Number(route.params.id)
    updatedComment.value.userId = props.userId
    updatedComment.value.date = new Date()
    updatedComment.value.commentId = new Date().getTime()
    if (props.comment === 'Reply') {
      updatedComment.value.parentId = singleComment.value.commentId
    }
    saveComment(updatedComment.value)
    emit('cancelComment')
    return
  }
  editComment(updatedComment.value)
  emit('cancelComment')
}

function cancelComment() {
  emit('cancelComment')
}

onMounted(() => {
  if (props.comment === 'Edit') {
    updatedComment.value = singleComment.value
  }
})
</script>
