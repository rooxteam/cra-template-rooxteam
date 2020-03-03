/**
 * Адаптер конфигураций проекта. Эти конфигурации поставляются средой
 * исполнения, т.е. тем сервером на котором хранится проект. Для среды разработки
 * конфигурации ипортируются из локального json файла.
 */

let config;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || typeof window.roox_config === 'undefined') {
  config = require('./localConfig.json'); // eslint-disable-line global-require
} else {
  config = window.roox_config;
}

const configAdapter = key => config[key];
const configObjTmp = config;

const uidmWebapi = configAdapter('com.rooxteam.webapi.url');
let uidmWebapiBase;

if (uidmWebapi && typeof uidmWebapi === 'string') {
  const theArr = uidmWebapi.split('/');
  theArr.pop();
  uidmWebapiBase = theArr.join('/');
} else {
  uidmWebapiBase = '/';
}
configAdapter.webApiClientUrl = uidmWebapiBase;

export const configObj = configObjTmp;
export default configAdapter;
