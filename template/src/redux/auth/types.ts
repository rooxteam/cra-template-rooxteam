import { CallEffect, PutEffect } from 'redux-saga/effects'
import * as actionsTypes from './constants'
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
  [actionsTypes.AUTH_LOADING_STATE]: (
    state: IAuthState,
    action: ILoadingStateAction,
  ) => IAuthState
  [actionsTypes.AUTH_AUTHENTICATED]: (
    state: IAuthState,
    action: IAuthenticated,
  ) => IAuthState

  [key: string]: any
}

export interface Handlers {
  [actionsTypes.AUTH_LOGIN](
    action: IBaseAction,
  ): Generator<
    PutEffect<ILoadingStateAction | IAuthenticated> | CallEffect<boolean>,
    void
  >

  [actionsTypes.AUTH_APP_INIT](
    action: IBaseAction,
  ): Generator<
    PutEffect<ILoadingStateAction | IAuthenticated> | CallEffect<boolean>,
    void
  >
}
