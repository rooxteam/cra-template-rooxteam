import { createActions } from 'redux-actions';

import * as constants from './constants';

export const {
  testActionRequest,
  testActionSuccess,
  testActionFailure,
} = createActions(
  constants.TEST_ACTION_REQUEST,
  constants.TEST_ACTION_SUCCESS,
  constants.TEST_ACTION_FAILURE,
);
