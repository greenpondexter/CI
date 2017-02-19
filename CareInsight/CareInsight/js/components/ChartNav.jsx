import React from 'react';
import AltContainer from 'alt-container';
import MemberActions from '../actions/MemberActions';
import MemberDataStore from '../stores/MemberDataStore';

var chartNav = React.createClass({

  render() {
    var self = this;
    return (
      <div className='chartNav buttonHolderMargin'>
        <div className="btn-group" data-step='1' data-intro='Click button to switch to different chart'>
            <button className="btn btn-white" onClick={this.showProps} type="button">Total Prospective</button>
            <button className="btn btn-white" onClick={this.showER} type="button">ER Setting</button>
            <button className="btn btn-white" onClick={this.showIP} type="button">IP Setting</button>
            <button className="btn btn-white" onClick={this.toggleTable} type="button" data-step='2' data-intro='Toggle the data table to show targeted members with top values or all targeted members. Showing all targeted members negatively affects performance of rendering charts.'>Toggle Table</button>
            <button className="btn btn-white" onClick={this.showAll} type="button">All Charts</button>
        </div>
      </div>
    );
  },
  getInitialState(){
      var self = this;
      return {
      };
  },
  showProps(){
    MemberActions.showProps();
  },
  showER(){
    MemberActions.showER();
  },
  showIP(){
    MemberActions.showIP();
  },
  toggleTable(){
    MemberActions.toggleTable();
  },
  showAll(){
    MemberActions.showAll();
  }
});

module.exports = chartNav;
