import { IAuthState } from './types'
import { AUTH_DUCK } from './constants'

export const getAuthLoadingState = (state: {
  [AUTH_DUCK]: IAuthState
}): string | null => state[AUTH_DUCK].loadingState

export const getIsAuthenticated = (state: {
  [AUTH_DUCK]: IAuthState
}): boolean => state[AUTH_DUCK].isAuthenticated
