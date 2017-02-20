import * as React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import compositeReducer from '../src/reducers/compositeReducer'
import {Provider} from 'react-redux'
import {SessionContainer} from '../src/containers/SessionContainer'

let store = createStore(compositeReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('CareInsightApp')
);
