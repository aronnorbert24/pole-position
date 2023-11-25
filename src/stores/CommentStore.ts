import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useArticleStore } from './ArticleStore'
import { parse, stringify } from 'flatted'
import { Comment } from '../types/comment'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: [] as Comment[],
    newComment: {
      articleId: 0,
      userId: '',
      childrenId: [],
      commentId: 0,
      parentId: 0,
      replies: [] as Comment[],
      body: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
      date: new Date(),
      likes: 0,
      likedBy: [],
    } as Comment,
  }),
  getters: {
    getArticleComments: (state) => {
      const articleStore: any = useArticleStore()
      return state.comments.filter((comment: any) => comment.commentId === articleStore.post.articleId)
    },
  },
  actions: {
    async saveToLocalStorage() {
      localStorage.setItem('comments', stringify(this.comments))
    },
    async getFromLocalStorage() {
      const newComments = localStorage.getItem('comments')
      if (newComments) {
        this.comments = parse(newCommments)
        return
      }
      this.comments = []
    },
    likedComment(comment: Comment, isCommentLiked: boolean, commentId: number) {
      const updatedComment = ref<Comment>(comment)

      if (isCommentLiked) {
        updatedComment.value.likes++
      } else if (updatedComment.value.likes >= 1) {
        updatedComment.value.likes--
      } else {
        return
      }
      if (updatedComment.value) {
        const index = updatedComment.value.likedBy.findIndex((user: string) => user === updatedComment.value.userId)
        if (isCommentLiked && index < 0) {
          updatedComment.value.likedBy.push(updatedComment.value.userId)
        } else {
          if (index >= 0) {
            updatedComment.value.likedBy.splice(index, 1)
          }
        }
      }
      if (updatedComment.value.parentId) {
        const parentComment = this.comments.find((comment) => comment.commentId === updatedComment.value.parentId)
        if (parentComment) {
          const index = parentComment.replies.findIndex(
            (comment: Comment) => comment.commentId === updatedComment.value.commentId
          )
          if (index) {
            parentComment.replies[index] = updatedComment.value
          }
        }
      } else {
        const i = this.comments.findIndex((comment) => comment.commentId === commentId)
        this.comments[i] = updatedComment.value
      }
      this.saveToLocalStorage()
    },
  },
})
