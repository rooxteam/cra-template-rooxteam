import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './constants'
import configAdapter from '../../configs/config'

const getInitialState = () => ({
  value: !Number.isNaN(Number(configAdapter('counterStartValue')))
    ? Number(configAdapter('counterStartValue'))
    : 0,
})

const mutations = {
  [INCREMENT_COUNTER]: state => {
    return { ...state, value: state.value + 1 }
  },
  [DECREMENT_COUNTER]: state => {
    return { ...state, value: state.value - 1 }
  },
}

export default (state = getInitialState(), action) => {
  return mutations[action.type] ? mutations[action.type](state, action) : state
}
