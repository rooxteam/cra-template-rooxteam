import configAdapter from './config'

interface IAccelerator {
  [key: string]: string | number | null | undefined
}

const getValuesFromConfigAdapter = (fields: Array<string>, url: string) => {
  return fields.reduce((accelerator: IAccelerator, field: string) => {
    return {
      ...accelerator,
      [field]: configAdapter(`${url}.${field}`),
    }
  }, {})
}
export default {
  getValuesFromConfigAdapter,
}
