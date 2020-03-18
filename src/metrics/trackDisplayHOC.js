import React, { useEffect } from 'react';
import { createMetrics } from 'react-metrics';

import MetricsConfig from './metrics.config';

const metrics = createMetrics(MetricsConfig);

export default function trackPageViewHOC(WrappedComponent) {
  return (props) => {
    useEffect(() => {
      // eslint-disable-next-line
      const { location: { pathname, search } } = props;
      const params = {
        pathname,
        query: search,
      };

      // page view tracking
      metrics.api.pageView('page.display', params);
    }, [props]);

    return <WrappedComponent {...props} />;
  };
}
