import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes, selectors } from '../../redux/counter'

const Counter = () => {
  const count = useSelector(selectors.getCountValue)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m8">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Counter component</span>
              <h4>
                Counter: <strong data-qa="counter-value">{count}</strong>
              </h4>
              <p>
                Here you can increment and decrement counter value using buttons
                below. All the state updates are performed via redux actions.
              </p>
            </div>
            <div className="card-action">
              <div className="group">
                <button
                  className="waves-effect waves-teal btn-flat blue"
                  type="button"
                  data-qa="decrement-counter"
                  onClick={() => dispatch(actionTypes.decrementCounter())}
                >
                  decrement
                </button>
                <button
                  className="waves-effect waves-teal btn-flat red"
                  type="button"
                  data-qa="increment-counter"
                  onClick={() => dispatch(actionTypes.incrementCounter())}
                >
                  increment
                </button>
                <button
                  className="waves-effect waves-teal btn-flat red"
                  type="button"
                  data-qa="increment-counter-async"
                  onClick={() =>
                    dispatch(actionTypes.incrementCounterAsync(1000))
                  }
                >
                  increment async
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Counter
