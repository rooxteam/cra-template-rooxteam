import { testSaga } from 'redux-saga-test-plan'
import { HANDLERS } from './sagas'
import * as actionTypes from './constants'
import {
  LOADING_STATE_LOADED,
  LOADING_STATE_LOADING,
} from '../../configs/constants'

describe('redux > auth > sagas', () => {
  it('Login > happy path', () => {
    const actionCreator = {
      type: actionTypes.AUTH_LOGIN,
    }

    testSaga(HANDLERS[actionTypes.AUTH_LOGIN], actionCreator)
      .next()
      .put({
        type: actionTypes.AUTH_LOADING_STATE,
        loadingState: LOADING_STATE_LOADING,
      })
      .next()
      .next()
      .put({
        type: actionTypes.AUTH_AUTHENTICATED,
        isAuthenticated: true,
      })
      .next()
      .put({
        type: actionTypes.AUTH_LOADING_STATE,
        loadingState: LOADING_STATE_LOADED,
      })
      .next()
      .isDone()
  })
  it('App init > happy path', () => {
    const actionCreator = {
      type: actionTypes.AUTH_APP_INIT,
    }

    testSaga(HANDLERS[actionTypes.AUTH_APP_INIT], actionCreator)
      .next()
      .put({
        type: actionTypes.AUTH_AUTHENTICATED,
        isAuthenticated: true,
      })
      .next()
      .put({
        type: actionTypes.AUTH_LOADING_STATE,
        loadingState: LOADING_STATE_LOADED,
      })
      .next()
      .isDone()
  })
})
