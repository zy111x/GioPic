import type { StorageListName } from '~/types'

interface LinkTypeMap { [key: string]: string }

// 渲染图标
export function renderIcon(icon: string) {
  return () => h('div', { class: `${icon}` })
}

// 将文件大小从字节或千字节转换为 KB、MB 或 GB
export function convertFileSize(size: number, isKb: boolean = false) {
  const units = isKb ? ['KB', 'MB', 'GB'] : ['Bytes', 'KB', 'MB', 'GB']
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024))

  return `${(size / 1024 ** unitIndex).toFixed(2)} ${units[unitIndex]}`
}

// 将 HTML 实体转换回它们对应的字符
export function unescapeHtml(safe: string): string {
  const htmlEntities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': '\'',
  }

  return safe.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, match => htmlEntities[match])
}

const linkTypeMap: LinkTypeMap = {
  url: 'URL',
  html: 'HTML',
  bbcode: 'BBcode',
  markdown: 'Markdown',
  markdown_with_link: 'Markdown With Link',
  thumbnail_url: 'Thumbnail URL',
}

// 格式化链接类型，用于显示
export function getFormatLinkType(linkType: string) {
  return linkTypeMap[linkType] || linkType
}

// 获取链接类型选项
export function getLinkTypeOptions() {
  return Object.entries(linkTypeMap).map(([value, label]) => ({ label, value }))
}

// 存储策略选项
export const selectStorageOptions = [
  {
    label: '兰空社区版',
    value: 'Lsky',
  },
  {
    label: '兰空企业版',
    value: 'LskyPro',
  },
]

// 获取存储策略的名字
export function getStorageName(val: StorageListName) {
  const option = selectStorageOptions.find(item => item.value === val)
  return option ? option.label : ''
}