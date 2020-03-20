import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './constants'
import { ICounterMutations, ICounterState, TCounterActionTypes } from './types'
import configAdapter from '../../configs/config'

const getInitialState = (): ICounterState => ({
  value: !Number.isNaN(Number(configAdapter('counterStartValue')))
    ? Number(configAdapter('counterStartValue'))
    : 0,
})

const mutations: ICounterMutations = {
  [INCREMENT_COUNTER]: (state: ICounterState) => {
    return { ...state, value: state.value + 1 }
  },
  [DECREMENT_COUNTER]: (state: ICounterState) => {
    return { ...state, value: state.value - 1 }
  },
}

export default (state = getInitialState(), action: TCounterActionTypes) => {
  return mutations[action.type] ? mutations[action.type](state, action) : state
}
