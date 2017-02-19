import React from 'react';
window.jQuery = require('jquery');
require('bootstrap');
var Intro = require('intro.js');
import SessionActions from '../actions/SessionActions'
var NavBar = React.createClass({

  render: function () {
    var self = this;
    return (
      <div className="top-navigation">
      <div className="row border-bottom white-bg">
        <nav className="navbar navbar-static-top" role="navigation">
            <div className="navbar-header">
                <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                    <i className="fa fa-reorder"></i>
                </button>
                <a href="#" className="navbar-brand">CareInsight</a>
            </div>
            <div className="navbar-collapse collapse" id="navbar">
                <ul className="nav navbar-nav">
                    <li className="active">
                    </li>
                </ul>
                <ul className="nav navbar-top-links navbar-right">
                  <li className='active'>
                    <a href='javascript:void(0)' onClick={() => {SessionActions.switchPage({page: 'POPULATION_ANALYZER', member_key:0})}}>Back</a>
                  </li>
                </ul>
            </div>
        </nav>
      </div>
      </div>
    );
  },
  startIntro(){
    Intro.introJs().start();
  }
});

module.exports = NavBar;
