import ReactGA from 'react-ga'
import { IGAInitOptions, IPageViewParams, ITrackParams } from './types'

/**
 * Performs the tracking calls to Google Analytics.
 * Utilizing Segment IO Analytics Integration.
 *
 * @module GoogleAnalytics
 * @class
 * @internal
 */

export default class GoogleAnalytics {
  private loaded: boolean

  private name: string

  private userId: string | null

  private promise: Promise<void> | null

  constructor(private options: IGAInitOptions) {
    this.name = 'Google Analytics'
    this.loaded = false
    this.options = options
    this.userId = null
    this.promise = null
  }

  pageView(eventName: string, params: IPageViewParams) {
    return this.track(eventName, params)
  }

  user(userId: string) {
    return new Promise(resolve => {
      this.userId = userId
      resolve({
        userId,
      })
    })
  }

  track(eventName: string, params: ITrackParams) {
    return new Promise((resolve, reject) => {
      this.load()
        .then(() => {
          GoogleAnalytics.push(eventName)
          resolve({
            eventName,
            params,
          })
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error('GA: Failed to initialize', error)
          reject(error)
        })
    })
  }

  static push(eventName: string /* , params: ITrackParams */) {
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

  private load() {
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
