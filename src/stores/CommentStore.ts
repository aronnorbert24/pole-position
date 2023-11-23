import { defineStore } from 'pinia'
import { useArticleStore } from './ArticleStore'
import { parse, stringify } from 'flatted'
import { Comment } from '../types/comment'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: [] as Comment[],
    newComment: {
      articleId: '',
      userId: '',
      childrenId: [],
      commentId: '',
      body: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
      date: new Date(),
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
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
      const savedComments = localStorage.getItem('comments')
      this.comments = savedCommments ? parse(savedComments) : []
    },
  },
})
