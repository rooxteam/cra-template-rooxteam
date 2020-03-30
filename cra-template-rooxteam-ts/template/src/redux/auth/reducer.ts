import { AUTH_AUTHENTICATED, AUTH_LOADING_STATE } from './constants'
import {
  TAnyAuthAction,
  IAuthenticated,
  IAuthMutations,
  IAuthState,
  ILoadingStateAction,
} from './types'

const getInitialState = (): IAuthState => ({
  loadingState: null,
  isAuthenticated: false,
})

const mutations: IAuthMutations = {
  [AUTH_LOADING_STATE]: (state: IAuthState, action: ILoadingStateAction) => {
    return {
      ...state,
      loadingState: action.loadingState,
    }
  },
  [AUTH_AUTHENTICATED]: (state: IAuthState, action: IAuthenticated) => {
    return {
      ...state,
      isAuthenticated: action.isAuthenticated,
    }
  },
}

export default (state = getInitialState(), action: TAnyAuthAction) => {
  return mutations[action.type] ? mutations[action.type](state, action) : state
}
