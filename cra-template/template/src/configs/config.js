/**
 * Адаптер конфигураций проекта. Эту конфигурации поставляются средой
 * исполнения, т.е. тем сервером на котором хранится проект. Для среды разработки
 * конфигурации ипортируются из локального json файла.
 */

let config

const configAdapter = (key) => config[key]

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'test' ||
  typeof window.roox_config === 'undefined'

if (isDev) {
  const localConfig = require('./localConfig') // eslint-disable-line global-require
  config = localConfig.default

  configAdapter.webApiClientUrl = process.env.REACT_APP_LOCAL_WEBAPI
} else {
  config = window.roox_config

  const uidmWebapi = configAdapter('com.rooxteam.webapi.url')
  let uidmWebapiBase

  if (uidmWebapi && typeof uidmWebapi === 'string') {
    const splittedWebapi = uidmWebapi.split('/')
    splittedWebapi.pop()
    uidmWebapiBase = splittedWebapi.join('/')
  } else {
    uidmWebapiBase = '/'
  }

  configAdapter.webApiClientUrl = uidmWebapiBase
}

export const configObj = config
export default configAdapter
