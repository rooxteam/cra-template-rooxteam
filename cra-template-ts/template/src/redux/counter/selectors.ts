import { ICounterState } from './types'
import { COUNTER_DUCK } from './constants'

export const getCountValue = (state: { [COUNTER_DUCK]: ICounterState }) =>
  state[COUNTER_DUCK].value
