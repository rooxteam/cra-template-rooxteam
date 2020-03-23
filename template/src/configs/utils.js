import configAdapter from './config'

const getValuesFromConfigAdapter = (fields, url) => {
  return fields.reduce((accelerator, field) => {
    return {
      ...accelerator,
      [field]: configAdapter(`${url}.${field}`),
    }
  }, {})
}
export default {
  getValuesFromConfigAdapter,
}
