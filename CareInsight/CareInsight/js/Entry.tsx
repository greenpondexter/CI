import * as React from 'react';
import {render} from 'react-dom';
import App from '../src/components/App';
import { createStore } from 'redux';
import compositeReducer from '../src/reducers/compositeReducer'
import {Provider} from 'react-redux'
import {SessionContainer} from '../src/containers/SessionContainer'
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware} from 'redux';
import {rootSaga} from '../src/sagas/memberProfileSaga'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  compositeReducer,
  applyMiddleware(sagaMiddleware)
  );

sagaMiddleware.run(rootSaga);


const A = SessionContainer as any 
render(
  <Provider store={store}>
    <A/>
  </Provider>, 
  document.getElementById('CareInsightApp')
);

export default store; 