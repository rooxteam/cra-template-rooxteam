import { testSaga } from 'redux-saga-test-plan'
import { HANDLERS } from './sagas'
import * as actionTypes from './constants'
import { LOADING_STATE_LOADED, LOADING_STATE_LOADING } from '../../configs/constants'
import { IBaseAction } from '../../types/baseTypes'

describe('redux > auth > sagas', () => {
  it('Login > happy path', () => {
    const actionCreator: IBaseAction = {
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
})
