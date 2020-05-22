import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './constants'
import counterReducer from './reducer'

describe('redux > counter > counterReducer', () => {
  it(`increments value, if ${INCREMENT_COUNTER} action is provided`, () => {
    const initialState = {
      value: 0,
    }

    const expectedState = {
      value: 1,
    }

    const action = {
      type: INCREMENT_COUNTER,
    }

    expect(counterReducer(initialState, action)).toEqual(expectedState)
  })

  it(`increments value, if ${DECREMENT_COUNTER} action is provided`, () => {
    const initialState = {
      value: 0,
    }

    const expectedState = {
      value: -1,
    }

    const action = {
      type: DECREMENT_COUNTER,
    }

    expect(counterReducer(initialState, action)).toEqual(expectedState)
  })
})
