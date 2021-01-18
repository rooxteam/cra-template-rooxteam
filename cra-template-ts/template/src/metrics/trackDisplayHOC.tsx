import React, { useEffect } from 'react'
// @ts-ignore
import { createMetrics } from 'react-metrics'

import MetricsConfig from './metrics.config'
import { IPageViewParams } from './types'

interface IMetrics {
  api: {
    pageView: (event: string, params: IPageViewParams) => Promise<void>
  }
}

const metrics: IMetrics = createMetrics(MetricsConfig)

export default function trackPageViewHOC(WrappedComponent: React.FC) {
  return (props: any) => {
    useEffect(() => {
      // eslint-disable-next-line
      const {
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
