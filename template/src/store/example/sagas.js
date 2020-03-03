import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

import axios from 'axios';
import * as actions from './actions';

const HANDLERS = {
  * [actions.testActionRequest]() {
    try {
      const { data } = yield call(axios, {
        method: 'post',
        url: 'test-url',
      });
      yield put(actions.testActionSuccess(data));
    } catch (e) {
      yield put(actions.testActionFailure(e));
    }
  },
};

export default function* saga() {
  const keys = Object.keys(HANDLERS);
  for (let i = 0; i < keys.length; i += 1) {
    yield takeEvery(keys[i], HANDLERS[keys[i]]);
  }
}
