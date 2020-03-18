/* eslint-disable */
import ym from 'react-yandex-metrika';

/**
 * Performs the tracking calls to Yandex Analytics.
 * Utilizing Segment IO Analytics Integration.
 *
 * @module YandexMetrika
 * @class
 * @internal
 */
class YandexMetrika {
  constructor(options = {}) {
    this.name = 'Yandex Analytics';
    this._loaded = false;
    this.options = options;
  }

  /**
   *
   * @method pageView
   * @param {String} eventName
   * @param {Object} params
   * @returns {Promise}
   * @internal
   */
  pageView(...args) {
    return this.track(...args);
  }

  user(userId) {
    return new Promise((resolve) => {
      this.userId = userId;
      resolve({
        userId,
      });
    });
  }

  /**
   *
   * @method track
   * @param {String} eventName
   * @param {Object} params
   * @returns {Promise}
   * @internal
   */
  track(eventName, params) {
    return new Promise((resolve, reject) => {
      this._load()
        .then(() => {
          this._track(eventName, params);
          resolve({
            eventName,
            params,
          });
        })
        .catch((error) => {
          console.error('YM: Failed to initialize', error);
          reject(error);
        });
    });
  }

  /**
   *
   * @method _track
   * @param {String} eventName
   * @param {Object} params
   * @protected
   */
  _track(eventName, params) {
    if (eventName === 'pageView') {
      ym('hit', params.category, {params: params});
      // analytics.page(params.category, params);
      return;
    }
    ym('reachGoal', eventName, params);
    // analytics.track(eventName, params);
  }

  /**
   *
   * @method _load
   * @protected
   */
  _load() {
    return (
      this._promise
      || (this._promise = new Promise((resolve) => {
        if (this._loaded) {
          resolve();
        } else {
          this._loaded = true;
          resolve();
        }
      }))
    );
  }
}

export default YandexMetrika;
