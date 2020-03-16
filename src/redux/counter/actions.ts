import * as actionTypes from './constants'

export const incrementCounter = () => ({ type: actionTypes.INCREMENT_COUNTER })
export const incrementCounterAsync = (delay: number) => ({ type: actionTypes.INCREMENT_COUNTER_ASYNC, delay })
export const decrementCounter = () => ({ type: actionTypes.DECREMENT_COUNTER })
