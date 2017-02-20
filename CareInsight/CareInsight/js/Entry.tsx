import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import SessionStore from './stores/SessionStore'
import AltContainer from 'alt-container'

ReactDOM.render(
  <AltContainer stores = {[SessionStore]} inject={SessionStore.getState().page}><App /></AltContainer>,  document.getElementById('CareInsightApp')
);
