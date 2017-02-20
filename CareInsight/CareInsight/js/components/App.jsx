import React from 'react';
import d3 from 'd3';
import MemberProfile from './MemberProfile';
import PopulationAnalyzer from './PopulationAnalyzer';
import SessionStore from '../stores/SessionStore';
import MemberDataStore from '../stores/MemberDataStore';
import ProfileDataStore from '../stores/ProfileDataStore';
import MemberActions from '../actions/MemberActions';
import AltContainer from 'alt-container';
import {toJS} from 'immutable'

var App = React.createClass({

  render: function () {
     let pageToRender = SessionStore.getState().info.get('page') === "POPULATION_ANALYZER" ?
                         <AltContainer stores = {[SessionStore, MemberDataStore]}
                                        inject = {{page : () => SessionStore.getState().info.get('page'), 
                                                   fullSet : () => MemberDataStore.getState().fullSet,
                                                   counter : () => MemberDataStore.getState().counter.get(0)
                                                 }}
                          >
                            <PopulationAnalyzer/> 
                          </AltContainer>
                        : <AltContainer stores = {[SessionStore, ProfileDataStore]}
                                        inject = {{page : () => SessionStore.getState().info.get('page'),
                                                   members : () => ProfileDataStore.getState().memberData,
                                                   summaryData : () => ProfileDataStore.getState().summaryData,
                                                   hcgData : () => ProfileDataStore.getState().hcgData 
                                                }}
                          >
                          <MemberProfile/>
                         </AltContainer>; 
          return (
            <div>
              {pageToRender}
            </div>
          )
  },

   componentDidMount: function(){
      MemberActions.loadMemberData();
  }


});

export default App;
