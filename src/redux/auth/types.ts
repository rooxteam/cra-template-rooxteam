import { CallEffect, PutEffect } from 'redux-saga/effects'
import * as actionsTypes from './constants'
import { AUTH_AUTHENTICATED, AUTH_LOADING_STATE } from './constants'
import { IBaseAction } from '../../types/baseTypes'

export interface IAuthState {
  loadingState: string | null
  isAuthenticated: boolean
}

export interface ILoadingStateAction extends IBaseAction {
  loadingState: string
}

export interface IAuthenticated extends IBaseAction {
  isAuthenticated: boolean
}

export type TAnyAuthAction = ILoadingStateAction | IAuthenticated

export interface IAuthMutations {
  [AUTH_LOADING_STATE]: (state: IAuthState, action: ILoadingStateAction) => IAuthState
  [AUTH_AUTHENTICATED]: (state: IAuthState, action: IAuthenticated) => IAuthState

  [key: string]: any
}

export interface Handlers {
  [actionsTypes.AUTH_LOGIN](
    action: IBaseAction,
  ): Generator<PutEffect<ILoadingStateAction | IAuthenticated> | CallEffect<boolean>,
    void>
}
