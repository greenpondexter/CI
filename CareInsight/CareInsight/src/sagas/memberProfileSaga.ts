import {call, put, take, takeLatest} from 'redux-saga/effects' 

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* loadPopAnalyzerSaga() {
  yield take('LOAD_POP_ANALYZER')
  yield take('LOAD_POP_ANALYZER')
}

export function* rootSaga(): any{
   yield [
    loadPopAnalyzerSaga(),
    incrementAsync()
  ] 
}