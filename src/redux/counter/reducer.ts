import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './constants'
import { CounterActionTypes } from './types'
import configAdapter from '../../configs/config'

const initialState = {
  value: !Number.isNaN(Number(configAdapter('counterStartValue'))) ? Number(configAdapter('counterStartValue')) : 0,
}

export default (state = initialState, action: CounterActionTypes) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, value: state.value + 1 }
    case DECREMENT_COUNTER:
      return { ...state, value: state.value - 1 }
    default:
      return state
  }
}
