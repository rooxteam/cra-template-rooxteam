import * as actions from './actions';

const initialState = {
  loading: 'false',
  error: null,
};

const HANDLERS = {
  [actions.testActionRequest]: state => ({
    ...state,
    loading: true,
  }),
  [actions.testActionSuccess]: state => ({
    ...state,
    loading: false,
  }),
  [actions.testActionFailure]: (state, payload) => ({
    ...state,
    loading: false,
    error: payload,
  }),
};

const reducer = (state = initialState, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state;
};

export default reducer;
