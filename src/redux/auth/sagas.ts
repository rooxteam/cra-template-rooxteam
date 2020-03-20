import { delay, put, takeEvery } from 'redux-saga/effects'
import * as actionsTypes from './constants'
import { Handlers } from './types'
import { setCookie } from '../../utils/cookiesUtils'
import {
  AUTH_TOKEN_KEY,
  LOADING_STATE_LOADED,
  LOADING_STATE_LOADING,
} from '../../configs/constants'
import * as actions from './actions'

export const HANDLERS: Handlers = {
  *[actionsTypes.AUTH_LOGIN]() {
    // get token somehow and init the app for example just set cookie
    yield put(actions.loadingState(LOADING_STATE_LOADING))
    setCookie(AUTH_TOKEN_KEY, 'token')
    yield delay(1000)
    yield put(actions.setIsAuthenticated(true))
    yield put(actions.loadingState(LOADING_STATE_LOADED))
  },
  *[actionsTypes.AUTH_APP_INIT]() {
    // get init application
    yield put(actions.setIsAuthenticated(true))
    yield put(actions.loadingState(LOADING_STATE_LOADED))
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
