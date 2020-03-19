import counterReducer from './reducer'
import { IAuthenticated, IAuthState, ILoadingStateAction } from './types'
import { LOADING_STATE_LOADED } from '../../configs/constants'
import { AUTH_AUTHENTICATED, AUTH_LOADING_STATE } from './constants'

describe('redux > auth > reducer', () => {
  it(`change loading state`, () => {
    const initialState: IAuthState = {
      loadingState: null,
      isAuthenticated: false,
    }

    const expectedState: IAuthState = {
      loadingState: LOADING_STATE_LOADED,
      isAuthenticated: false,
    }

    const action: ILoadingStateAction = {
      type: AUTH_LOADING_STATE,
      loadingState: LOADING_STATE_LOADED,
    }

    expect(counterReducer(initialState, action)).toEqual(expectedState)
  })
  it(`change login flag`, () => {
    const initialState: IAuthState = {
      loadingState: null,
      isAuthenticated: false,
    }

    const expectedState: IAuthState = {
      loadingState: null,
      isAuthenticated: true,
    }

    const action: IAuthenticated = {
      type: AUTH_AUTHENTICATED,
      isAuthenticated: true,
    }

    expect(counterReducer(initialState, action)).toEqual(expectedState)
  })
})
