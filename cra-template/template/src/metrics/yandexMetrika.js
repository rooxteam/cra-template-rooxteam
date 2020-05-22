import ym from 'react-yandex-metrika'

/**
 * Performs the tracking calls to Yandex Analytics.
 * Utilizing Segment IO Analytics Integration.
 *
 * @module YandexMetrika
 * @class
 * @internal
 */
class YandexMetrika {
  constructor(options) {
    this.name = 'Yandex Analytics'
    this.loaded = false
    this.options = options
    this.userId = null
    this.promise = null
  }

  pageView(eventName, params) {
    return this.track(eventName, params)
  }

  user(userId) {
    return new Promise(resolve => {
      this.userId = userId
      resolve({
        userId,
      })
    })
  }

  track(eventName, params) {
    return new Promise((resolve, reject) => {
      this.load()
        .then(() => {
          YandexMetrika.push(eventName, params)
          resolve({
            eventName,
            params,
          })
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('YM: Failed to initialize', error)
          reject(error)
        })
    })
  }

  static push(eventName, params) {
    if (eventName === 'pageView') {
      ym('hit', params.category, { params })
      // analytics.page(params.category, params);
      return
    }
    ym('reachGoal', eventName, params)
    // analytics.track(eventName, params);
  }

  load() {
    if (!this.promise) {
      this.promise = new Promise(resolve => {
        if (this.loaded) {
          resolve()
        } else {
          this.loaded = true
          resolve()
        }
      })
    }
    return this.promise
  }
}

export default YandexMetrika
