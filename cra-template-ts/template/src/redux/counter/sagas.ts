import { put, takeEvery } from 'redux-saga/effects'
import * as actionsTypes from './constants'
import * as actions from './actions'
import { IHandlers } from './types'

const delay = (ms: number): Promise<number> =>
  new Promise((res) => setTimeout(res, ms))

export const HANDLERS: IHandlers = {
  *[actionsTypes.INCREMENT_COUNTER_ASYNC](action) {
    yield delay(action.delay)
    yield put(actions.incrementCounter())
  },
}

export default function* saga() {
  const keys: Array<string> = Object.keys(HANDLERS)
  for (let i: number = 0; i < keys.length; i += 1) {
    const actionType: string = keys[i]
    if (
      actionType &&
      Object.prototype.hasOwnProperty.call(HANDLERS, actionType)
    ) {
      // @ts-ignore
      yield takeEvery(actionType, HANDLERS[actionType])
    }
  }
}
