import { AUTH_AUTHENTICATED, AUTH_LOADING_STATE } from './constants'

const getInitialState = () => ({
  loadingState: null,
  isAuthenticated: false,
})

const mutations = {
  [AUTH_LOADING_STATE]: (state, action) => {
    return {
      ...state,
      loadingState: action.loadingState,
    }
  },
  [AUTH_AUTHENTICATED]: (state, action) => {
    return {
      ...state,
      isAuthenticated: action.isAuthenticated,
    }
  },
}

export default (state = getInitialState(), action) => {
  return mutations[action.type] ? mutations[action.type](state, action) : state
}
