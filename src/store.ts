import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { CounterReducer } from './redux/counter'
import { sagas } from './redux'

const sagaMiddleware = createSagaMiddleware()
/* Create root reducer, containing all redux of the application */
const middlewares = [sagaMiddleware]
const rootReducer = combineReducers({
  count: CounterReducer,
})

function* staticSagas() {
  yield all([...sagas.map(saga => saga())])
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(staticSagas)

export default store
