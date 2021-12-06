export default function dateFormat(date: Date) {
    return date.toLocaleString('zh-CN', { dateStyle: 'short' }) + " " + date.toLocaleString('zh-CN', { timeStyle: 'medium' })
}
  