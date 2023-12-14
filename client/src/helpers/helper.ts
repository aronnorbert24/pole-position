import { Comment } from '../types/comment'

export function formatDate(formattingDate: Date) {
  const date = new Date(formattingDate)
  const year = date.getFullYear()
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${year}. ${month}. ${day}`
}

export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export function sortComment(activeSort: string, comments: Comment[]) {
  return comments.sort((a: Comment, b: Comment) => {
    switch (activeSort) {
      case 'Oldest':
        return sortByOldest(a, b)
      case 'Newest':
        return sortByNewest(a, b)
      case 'Best':
        return sortByBest(a, b)
      default:
        return 0
    }
  })
}

function sortByOldest(a: Comment, b: Comment) {
  const previous: any = new Date(a.date)
  const next: any = new Date(b.date)
  return previous - next
}

function sortByNewest(a: Comment, b: Comment) {
  const previous: any = new Date(a.date)
  const next: any = new Date(b.date)
  return next - previous
}

function sortByBest(a: Comment, b: Comment) {
  const previous: any = a.likes
  const next: any = b.likes
  return next - previous
}

export function setItems(data: any) {
  localStorage.setItem('username', data.username)
  localStorage.setItem('email', data.email)
  localStorage.setItem('userId', data._id)
  localStorage.setItem('userPicture', data.userPicture)
}

export function getItems(property: string) {
  return localStorage.getItem(property)
}