import ReactGA from 'react-ga'
/**
 * Performs the tracking calls to Google Analytics.
 * Utilizing Segment IO Analytics Integration.
 *
 * @module GoogleAnalytics
 * @class
 * @internal
 */

export default class GoogleAnalytics {
  constructor(options) {
    this.name = 'Google Analytics'
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
          GoogleAnalytics.push(eventName)
          resolve({
            eventName,
            params,
          })
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('GA: Failed to initialize', error)
          reject(error)
        })
    })
  }

  static push(eventName /* , params: ITrackParams */) {
    if (eventName === 'pageView') {
      // analytics.page(params.category, params);
      ReactGA.pageview(window.location.pathname + window.location.search)
      return
    }
    // analytics.track(eventName, params);
    ReactGA.event({
      category: eventName,
      action: eventName,
    })
  }

  load() {
    if (!this.promise) {
      this.promise = new Promise(resolve => {
        if (this.loaded) {
          resolve()
        } else {
          ReactGA.initialize(this.options.trackingId)
          this.loaded = true
          resolve()
        }
      })
    }
    return this.promise
  }
}
