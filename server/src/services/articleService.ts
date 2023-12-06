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

  async getArticles() {
    const articles = await ArticleModel.find({})
    console.log('In service ' + articles)
    return articles
  }
}

export default new ArticleService()