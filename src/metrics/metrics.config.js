import sbjs from 'sourcebuster'
import YandexMetrika from './yandexMetrika'
import GoogleAnalytics from './googleAnalytics'

sbjs.init()

const gaOptions = {
  trackingId: 'UA-149871459-1',
}

const ymOptions = {
  counterId: 55749373,
}

const config = {
  enabled: process.env.NODE_ENV !== 'development',
  // enabled: true,
  vendors: [
    { name: 'GA', api: new GoogleAnalytics(gaOptions) },
    { name: 'YM', api: new YandexMetrika(ymOptions) },
  ],
  pageDefaults: () => ({
    current_source: {
      medium: sbjs.get.current.mdm || 'not_set',
      source: sbjs.get.current.src || 'not_set',
      campaign: sbjs.get.current.cmp || 'not_set',
      keyword: sbjs.get.current.trm || 'not_set',
    },

    first_source: {
      medium: sbjs.get.first.mdm || 'not_set',
      source: sbjs.get.first.src || 'not_set',
      campaign: sbjs.get.first.cmp || 'not_set',
      keyword: sbjs.get.first.trm || 'not_set',
    },
  }),
  pageViewEvent: 'com.rooxteam.pageLoad',
  // debug: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
  debug: false,
}

export default config
