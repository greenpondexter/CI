import alt from '../alt';

class MemberActions {
  constructor() {
    this.generateActions(
      'init',
      'showProps',
      'showER',
      'showIP',
      'showAll',
      'toggleTable',
      'loadMemberData',
      'filterUpdate'
    )
  }
}

module.exports = alt.createActions(MemberActions)
