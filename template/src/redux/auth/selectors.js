import { AUTH_DUCK } from './constants'

export const getAuthLoadingState = state => state[AUTH_DUCK].loadingState
export const getIsAuthenticated = state => state[AUTH_DUCK].isAuthenticated
