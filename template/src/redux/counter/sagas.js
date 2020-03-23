import { put, takeEvery } from 'redux-saga/effects'
import * as actionsTypes from './constants'
import * as actions from './actions'

const delay = ms => new Promise(res => setTimeout(res, ms))

export const HANDLERS = {
  *[actionsTypes.INCREMENT_COUNTER_ASYNC](action) {
    yield delay(action.delay)
    yield put(actions.incrementCounter())
  },
}

export default function* saga() {
  const keys = Object.keys(HANDLERS)
  for (let i = 0; i < keys.length; i += 1) {
    const actionType = keys[i]
    if (
      actionType &&
      Object.prototype.hasOwnProperty.call(HANDLERS, actionType)
    ) {
      yield takeEvery(actionType, HANDLERS[actionType])
    }
  }
}
