import { all } from 'redux-saga/effects';
import { postSaga } from './posts';

export default function* rootSaga() {
  yield all([
    ...postSaga,
  ]);
}