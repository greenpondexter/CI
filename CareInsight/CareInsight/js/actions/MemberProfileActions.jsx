import alt from '../alt';

class MemberProfileActions {
  constructor() {
    this.generateActions(
      'loadMemberData',
      'updateDate'
    )
  }
}

module.exports = alt.createActions(MemberProfileActions)
