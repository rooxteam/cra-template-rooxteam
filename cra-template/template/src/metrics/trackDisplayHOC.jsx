import React, { useEffect } from 'react'
import { createMetrics } from 'react-metrics'

import MetricsConfig from './metrics.config'

const metrics = createMetrics(MetricsConfig)

export default function trackPageViewHOC(WrappedComponent) {
  return (props) => {
    useEffect(() => {
      const {
        // eslint-disable-next-line
        location: { pathname, search },
      } = props
      const params = {
        pathname,
        query: search,
      }

      // page view tracking
      metrics.api.pageView('page.display', params)
    }, [props])

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />
  }
}
