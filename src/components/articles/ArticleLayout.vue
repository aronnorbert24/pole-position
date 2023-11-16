<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <TitleSeparator :title="article.category" @showArticlesByCategory="showArticlesByCategory" />
    <SingleArticle :article="article" />
    <div
      id="likeButton"
      class="flex h-12 w-24 rounded-xl transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:ml-2 phone:h-10 phone:w-16"
      :class="getLikedClass"
      @click.prevent="likedArticle"
    >
      <LikeIcon />
      <p class="ml-1 mt-2">{{ likes }}</p>
    </div>
    <div class="mt-12 h-fit w-full rounded-xl bg-white p-2">
      <SortComment @sortComments="sortComments" />
      <button
        v-if="!isCreateCommentVisible"
        class="mb-6 mt-2 h-12 w-32 bg-gray-300 text-center text-lg text-black hover:cursor-pointer"
        @click="toggleCreateComment"
      >
        Comment
      </button>
      <CreateComment
        v-if="isCreateCommentVisible"
        :comment="createComment"
        :user="user"
        @saveComment="saveComment"
        @cancelComment="toggleCreateComment"
      />
      <div v-for="(articleComment, index) in rootComments" :key="index">
        <ArticleComment
          :user="user"
          :comment="articleComment"
          :createComment="createComment"
          @likedComment="likedComment"
          @saveReply="saveReply"
          @editComment="editComment"
        />
        <div v-for="(reply, index) in articleComment.replies" :key="index">
          <div class="ml-40 w-9/12">
            <ArticleComment
              v-if="articleComment.replies.length"
              :user="user"
              :comment="reply"
              :createComment="createComment"
              @likedComment="likedComment"
              @saveReply="saveReply"
              @editComment="editComment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SingleArticle from './SingleArticle.vue'
import ArticleComment from './ArticleComment.vue'
import CreateComment from './CreateComment.vue'
import SortComment from './SortComment.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import LikeIcon from '../icons/LikeIcon.vue'

import { Article } from '../../types/article.ts'
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

interface Props {
  article: Article
  user: User
  comments: Comment[]
  createComment: Comment
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedArticle', article: Article, likes: number, isPostLiked: boolean, date: Date, userId: string): void
  (e: 'showArticlesByCategory', title: string): void
  (e: 'saveComment', comment: Comment): void
  (e: 'editComment', comment: Comment): void
  (e: 'sortComments', activeSort: string): void
  (e: 'saveReply', parentComment: Comment): void
  (e: 'likedComment', comment: Comment, likes: number, isCommentLiked: boolean, commentId: number, userId: string): void
}>()

const createComment = computed(() => {
  return props.createComment
})

const rootComments = computed(() => {
  return props.comments.filter((comment) => !comment.parentId)
})
const updatedArticleId = computed(() => {
  return props.article.articleId
})
const likes = computed(() => {
  return props.article.likes
})
const isPostLiked = computed(() => {
  return props.article.likedBy.includes(props.user.userId)
})
const isCreateCommentVisible = ref(false)

const getLikedClass = computed(() => {
  return !isPostLiked.value ? 'bg-white text-black' : 'bg-red-600 text-white'
})

function likedArticle() {
  emit('likedArticle', props.article, likes.value, !isPostLiked.value, props.article.datePublished, props.user.userId)
}

function saveComment(comment: Comment) {
  comment.articleId = updatedArticleId.value
  emit('saveComment', comment)
  toggleCreateComment()
}

function likedComment(comment: Comment, likes: number, isCommentLiked: boolean, commentId: number, userId: string) {
  if (isCommentLiked) {
    likes++
  } else if (likes >= 1) {
    likes--
  } else {
    return
  }
  emit('likedComment', comment, likes, isCommentLiked, commentId, userId)
}

function sortComments(activeSort: string) {
  emit('sortComments', activeSort)
}

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}

function saveReply(parentComment: Comment, reply: Comment) {
  const updatedParentComment: Comment = {
    articleId: parentComment.articleId,
    userId: parentComment.userId,
    parentId: parentComment.parentId,
    commentId: parentComment.commentId,
    replies: parentComment.replies,
    body: parentComment.body,
    date: parentComment.date,
    likedBy: parentComment.likedBy,
    likes: parentComment.likes,
  }
  reply.articleId = updatedArticleId.value
  if (updatedParentComment) {
    parentComment.replies.push(reply)
  }
  emit('saveReply', parentComment)
}

function editComment(comment: Comment) {
  emit('editComment', comment)
}

function toggleCreateComment() {
  isCreateCommentVisible.value = !isCreateCommentVisible.value
}
</script>
