import { testSaga } from 'redux-saga-test-plan'
import { HANDLERS } from './sagas'
import * as actionTypes from './constants'

describe('redux > counter > sagas', () => {
  it('IncrementCounterActionAsync > happy path', () => {
    const actionCreator = {
      type: actionTypes.INCREMENT_COUNTER_ASYNC,
      delay: 1000,
    }

    testSaga(HANDLERS[actionTypes.INCREMENT_COUNTER_ASYNC], actionCreator)
      .next()
      .next()
      .put({ type: actionTypes.INCREMENT_COUNTER })
      .next()
      .isDone()
  })
})
