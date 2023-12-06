import axios from 'axios'
import { Article } from '../types/article'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function save(data: Article) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/article/save`, {
      title: data.title,
      subheading: data.subheading,
      separatedText: data.separatedText,
      image: data.image,
      category: data.category,
      datePublished: data.datePublished,
      likedBy: data.likedBy,
      likes: data.likes,
      views: data.views,
    })
    localStorage.setItem('articleId', response.data._id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getArticles() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/article/getArticles`, {
    })
    localStorage.setItem('articles', JSON.stringify(response.data))
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function editArticle(articleId: string, article: Article) {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/article/edit/${articleId}`, {
        title: article.title,
        subheading: article.subheading,
        separatedText: article.separatedText,
        image: article.image,
        category: article.category,
        datePublished: article.datePublished,
        likedBy: article.likedBy,
        likes: article.likes,
        views: article.views,
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteArticle(id: string) {
  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/article/delete/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}