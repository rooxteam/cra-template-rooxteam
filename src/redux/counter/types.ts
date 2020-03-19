import { PutEffect } from 'redux-saga/effects'
import {
  DECREMENT_COUNTER,
  INCREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC,
} from './constants'

export interface ICounterState {
  value: number
}

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

export interface ICounterMutations {
  [INCREMENT_COUNTER]: (state: ICounterState) => ICounterState
  [DECREMENT_COUNTER]: (state: ICounterState) => ICounterState

  [key: string]: any
}

export type TCounterActionTypes =
  | IncrementCounterAction
  | IncrementCounterActionAsync
  | DecrementCounterAction

export interface IHandlers {
  [INCREMENT_COUNTER_ASYNC](
    action: IncrementCounterActionAsync,
  ): Generator<Promise<number> | PutEffect<{ type: string }>, void>
}
