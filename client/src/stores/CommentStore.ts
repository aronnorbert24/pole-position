import { ref } from 'vue'
import { defineStore } from 'pinia'
import { parse, stringify } from 'flatted'
import { sortComment } from '../helpers/helper'
import { Comment } from '../types/comment'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: [] as Comment[],
    singleComment: {
      articleId: 0,
      userId: '',
      commentId: 0,
      parentId: 0,
      replies: [] as Comment[],
      body: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
      date: new Date(),
      likes: 0,
      likedBy: [],
    } as Comment,
    activeSort: 'Oldest',
    singleArticleComments: [] as Comment[]
  }),
  getters: {
    getArticleComments: (state) => {
      return (articleId: number) => state.comments.filter((comment: any) => comment.articleId === articleId)
    },
    getSortedComments(state) {
      return (articleId: number) => sortComment(state.activeSort, this.getArticleComments(articleId))
    }
  },
  actions: {
    async saveCommentsToLocalStorage() {
      localStorage.setItem('comments', stringify(this.comments))
    },
    async getCommentsFromLocalStorage() {
      const newComments = localStorage.getItem('comments')
      this.comments = newComments ? parse(newComments) : []
    },
    saveComment(comment: Comment) {
      const updatedComment: Comment = {
        articleId: comment.articleId,
        userId: comment.userId,
        parentId: comment.parentId,
        commentId: comment.commentId,
        replies: comment.replies,
        body: comment.body,
        date: comment.date,
        likedBy: comment.likedBy,
        likes: comment.likes,
      }
      
      if (updatedComment) {
       if (updatedComment.parentId) {
          const index = this.comments.findIndex((comment: Comment) => comment.commentId === updatedComment.parentId)
          this.comments[index].replies.push(updatedComment)
        } else {
          this.comments.push(updatedComment)
        }
        this.saveCommentsToLocalStorage()
      }
    },
    editComment(comment: Comment) {
      const updatedComment: Comment = {
        articleId: comment.articleId,
        userId: comment.userId,
        parentId: comment.parentId,
        commentId: comment.commentId,
        replies: comment.replies,
        body: comment.body,
        date: comment.date,
        likedBy: comment.likedBy,
        likes: comment.likes,
      }
      
      if (updatedComment) {
       if (updatedComment.parentId) {
          const parentIndex = this.comments.findIndex((comment: Comment) => comment.commentId === updatedComment.parentId)
          const index = this.comments[parentIndex].replies.findIndex((comment: Comment) => comment.commentId === updatedComment.commentId)
          this.comments[parentIndex].replies[index] = updatedComment
        } else {
          const index = this.comments.findIndex((comment: Comment) => comment.commentId === updatedComment.commentId)
          this.comments[index] = updatedComment
        }
        this.saveCommentsToLocalStorage()
      }
    },
    likedComment(comment: Comment, isCommentLiked: boolean, userId: string) {
      const updatedComment = ref<Comment>(comment)

      if (isCommentLiked) {
        updatedComment.value.likes++
      } else if (updatedComment.value.likes >= 1) {
        updatedComment.value.likes--
      } else {
        return
      }
      if (updatedComment.value) {
        const index = updatedComment.value.likedBy.findIndex((id: string) => id === userId)
        if (isCommentLiked && index < 0) {
          updatedComment.value.likedBy.push(userId)
        } else {
          if (index >= 0) {
            updatedComment.value.likedBy.splice(index, 1)
          }
        }
      }
      if (updatedComment.value.parentId) {
        const parentIndex = this.comments.findIndex((comment) => comment.commentId === updatedComment.value.parentId)
        if (parentIndex) {
          const index = this.comments[parentIndex].replies.findIndex(
            (comment: Comment) => comment.commentId === updatedComment.value.commentId
          )
          if (index) {
            this.comments[parentIndex].replies[index] = updatedComment.value
          }
        }
      } else {
        const i = this.comments.findIndex((c) => c.commentId === updatedComment.value.commentId)
        this.comments[i] = updatedComment.value
      }
      this.saveCommentsToLocalStorage()
    },
    deleteComment(commentToDelete: Comment) {
      if (commentToDelete.parentId) {
        const parentIndex = this.comments.findIndex((comment) => comment.commentId === commentToDelete.parentId)
        if (parentIndex) {
          const index = this.comments[parentIndex].replies.findIndex(
            (comment: Comment) => comment.commentId === commentToDelete.commentId
          )
          this.comments[parentIndex].replies.splice(index, 1)
        }
      } else {
        const i = this.comments.findIndex((comment) => comment.commentId === commentToDelete.commentId)
        this.comments.splice(i, 1)
      }
      this.saveCommentsToLocalStorage()
    },
    setActiveSort(activeSort: string) {
      this.activeSort = activeSort
    },
    setSingleComment(comment: Comment) {
      this.singleComment = comment
    }
  },
})
