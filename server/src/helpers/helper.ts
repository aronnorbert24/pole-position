import { Article } from "../models/Article"

export function searchArticles(articles: Article[], search: string) {
      return articles.filter((article: Article) => {
        const filterSmall = search.toLowerCase()
        const titleSmall = article.title.toLowerCase()
        const subheadingSmall = article.subheading.toLowerCase()
        return titleSmall.includes(filterSmall) || subheadingSmall.includes(filterSmall)
      })

}