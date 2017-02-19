import Alt from '../alt.js';
import SessionActions from '../actions/SessionActions';
import {Map} from 'immutable';

class SessionStore {
  constructor() {
    this.bindActions(SessionActions)
    this.info = Map({
        page : "POPULATION_ANALYZER", 
        member : 0
    }); 

    }
  
    onSwitchPage(page){
        this.info = this.info.set('page',page.page); 
        this.info = this.info.set('member_key', page.member_key) 
    }
}

module.exports = Alt.createStore(SessionStore, 'SessionStore');
