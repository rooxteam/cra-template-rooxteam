import React from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../../redux/auth'
import styles from './LoginButton.module.scss'
import { login } from '../../redux/auth/actions'
import { LOADING_STATE_LOADING } from '../../configs/constants'

const LoginButton: React.FC = () => {
  const authLoadingState = useSelector(selectors.getAuthLoadingState)
  const dispatch = useDispatch()

  return (
    <button
      type="button"
      className={cn(styles.button, 'btn')}
      onClick={() => dispatch(login())}
    >
      {authLoadingState === LOADING_STATE_LOADING ? (
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      ) : (
        <span>Login</span>
      )}
    </button>
  )
}

export default LoginButton
