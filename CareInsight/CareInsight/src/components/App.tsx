import * as React from 'react';
import MemberProfile from '../../js/components/MemberProfile';
import {PopulationAnalyzerContainer} from '../containers/PopulationAnalyzerContainer';
//import SessionStore from '../../js/stores/SessionStore';
//import MemberDataStore from '../../js/stores/MemberDataStore';
//import ProfileDataStore from '../../js/stores/ProfileDataStore';
//import MemberActions from '../../js/actions/MemberActions';
//import AltContainer from 'alt-container';
//import {toJS} from 'immutable'
import {Provider} from 'react-redux';
import store from '../../js/Entry';
//import {PopulationAnalayzerPageProps} from '../containers/PopulationAnalyzerContainer'
import {AppPageProps} from '../containers/SessionContainer';
import {PopulationAnalyzerPageProps} from '../containers/PopulationAnalyzerContainer';

export default class App extends React.Component<AppPageProps, any>{
  // constructor(props: AppPageProps){
  //   super(props);
  // }

  render() {
    
    let PA = PopulationAnalyzerContainer as any; 
    let pageToRender = this.props.page === "POPULATION_ANALYZER" ?
                        //  <AltContainer stores = {[SessionStore, MemberDataStore]}
                        //                 inject = {{page : () => SessionStore.getState().info.get('page'), 
                        //                            fullSet : () => MemberDataStore.getState().fullSet,
                        //                            counter : () => MemberDataStore.getState().counter.get(0)
                        //                          }}
                        //   >
                        //<Provider store={store}>
                            <PA/> 
                        //</Provider>
                        : null ;// <AltContainer stores = {[SessionStore, ProfileDataStore]}
                        //                 inject = {{page : () => SessionStore.getState().info.get('page'),
                        //                            members : () => ProfileDataStore.getState().memberData,
                        //                            summaryData : () => ProfileDataStore.getState().summaryData,
                        //                            hcgData : () => ProfileDataStore.getState().hcgData 
                        //                         }}
                        //   >
                        //   <MemberProfile/>
                        //  </AltContainer>; 
          return (
            <div>
              {pageToRender}
            </div>
          )
  }

   componentDidMount(){
      this.props.onPopulationAnalyzerLoad();
      //MemberActions.loadMemberData();
      //this.props.onPopulationAnalyzerLoad()
  }


}

