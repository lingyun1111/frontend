import defaultSettings from '@adminTemplate/settings'

const title = defaultSettings.title || '后台模板'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
