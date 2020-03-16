import { DECREMENT_COUNTER, INCREMENT_COUNTER, INCREMENT_COUNTER_ASYNC } from './constants'
import { PutEffect } from 'redux-saga/effects'

export interface IncrementCounterAction {
  type: typeof INCREMENT_COUNTER
}

export interface IncrementCounterActionAsync {
  type: typeof INCREMENT_COUNTER_ASYNC
  delay: number
}

export interface DecrementCounterAction {
  type: typeof DECREMENT_COUNTER
}

export type CounterActionTypes = IncrementCounterAction | IncrementCounterActionAsync | DecrementCounterAction

export interface SystemState {
  count: {
    value: number
  }
}

export interface Handlers {
  [INCREMENT_COUNTER_ASYNC](
    action: IncrementCounterActionAsync,
  ): Generator<Promise<number> | PutEffect<{ type: string }>, void, unknown>
}
