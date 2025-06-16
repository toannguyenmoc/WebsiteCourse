export function formatDate(date, locale = 'vi-VN') {
  return new Date(date).toLocaleDateString(locale)
}

export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key])
    if (value > 0) return `${value} ${key}${value > 1 ? 's' : ''} ago`
  }

  return 'Just now'
}
