import { searchArticles } from '../helpers/helper.ts'
import ArticleModel, { Article } from '../models/Article'

class ArticleService {
  async saveArticle(data: Article) {
    const newArticle = new ArticleModel({
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

    const savedArticle = await newArticle.save()

    return savedArticle
  }

  async getArticles(search: string) {
    const articles = await ArticleModel.find({})
    if (!search) {
      return articles
    }
    const updatedArticles = searchArticles(articles, search) 
    return updatedArticles
  }

  async getTrendingArticles() {
    const articles = await ArticleModel.find({}).sort({ views: -1 }).slice('articles', 5)
    return articles
  }

  async findArticlesByCategory(category: string) {
    const articles = await ArticleModel.find({category: category})
    return articles
  }

  async findArticleById(articleId: string) {
    await ArticleModel.findOneAndUpdate({_id: articleId}, { $inc: { views: 1 } })
    const article = await ArticleModel.findById(articleId).exec()
    return article
  }

  async updateArticleById(articleId: string, newArticle: Article) {
    await ArticleModel.findByIdAndUpdate(articleId, newArticle)
    const updatedArticle = this.findArticleById(articleId)
    return updatedArticle
  }

  async deleteArticleById(articleId: string) {
    await ArticleModel.findByIdAndDelete(articleId)
  }
}

export default new ArticleService()