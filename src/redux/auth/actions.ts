import * as actionTypes from './constants'
import { IAuthenticated, ILoadingStateAction } from './types'
import { IBaseAction } from '../../types/baseTypes'

export const login = (): IBaseAction => ({ type: actionTypes.AUTH_LOGIN })
export const setIsAuthenticated = (
  isAuthenticated: boolean,
): IAuthenticated => ({
  type: actionTypes.AUTH_AUTHENTICATED,
  isAuthenticated,
})
export const logout = (): IBaseAction => ({ type: actionTypes.AUTH_LOGOUT })
export const loadingState = (
  loadingStateParam: string,
): ILoadingStateAction => ({
  type: actionTypes.AUTH_LOADING_STATE,
  loadingState: loadingStateParam,
})
