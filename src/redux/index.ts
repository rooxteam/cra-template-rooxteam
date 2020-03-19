import counter from './counter/reducer'
import counterSaga from './counter/sagas'
import auth from './auth/reducer'
import authSaga from './auth/sagas'

export const sagas = [counterSaga, authSaga]
export const reducers = {
  auth,
  counter,
}
