import * as actionTypes from './constants'

export const login = () => ({ type: actionTypes.AUTH_LOGIN })
export const setIsAuthenticated = isAuthenticated => ({
  type: actionTypes.AUTH_AUTHENTICATED,
  isAuthenticated,
})
export const logout = () => ({ type: actionTypes.AUTH_LOGOUT })
export const loadingState = loadingStateParam => ({
  type: actionTypes.AUTH_LOADING_STATE,
  loadingState: loadingStateParam,
})
export const appInit = () => ({
  type: actionTypes.AUTH_APP_INIT,
})
