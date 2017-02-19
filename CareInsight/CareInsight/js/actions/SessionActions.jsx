import alt from '../alt';

class SessionActions {
  constructor() {
    this.generateActions(
      'switchPage'
    )
  }
}

module.exports = alt.createActions(SessionActions)
