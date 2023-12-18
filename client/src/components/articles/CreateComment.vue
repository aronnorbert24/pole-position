<template>
  <div class="flex">
    <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="userStore.getUserPicture" />
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
import { stringify } from 'flatted';
import { useCommentStore } from '../../stores/CommentStore';
import { useUserStore } from '../../stores/UserStore';
import { Comment } from '../../types/comment.ts'

const route = useRoute()
const { singleComment } = storeToRefs(useCommentStore())
const commentStore = useCommentStore()
const userStore = useUserStore()


interface Props {
  comment: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancelComment'): void
}>()

const updatedComment = ref<Comment>({
      articleId: '',
      userId: '',
      username: 'Anonymous',
      userPicture: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
      _id: '',
      parentId: '',
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

  if (!updatedComment.value._id) {
    updatedComment.value.articleId = route.params.id.toString()
    updatedComment.value.userId = userStore.loggedInUserId
    updatedComment.value.username = userStore.getNewUsername
    updatedComment.value.userPicture = userStore.getUserPicture
    updatedComment.value.date = new Date()
    if (props.comment === 'Reply') {
      updatedComment.value.parentId = singleComment.value._id
    }
    commentStore.saveComment(stringify(updatedComment.value))
    emit('cancelComment')
    return
  }
  commentStore.editComment(updatedComment.value)
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
