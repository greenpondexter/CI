import * as React from 'react';
import MemberProfile from '../../js/components/MemberProfile';
import {PopulationAnalyzerContainer} from '../containers/PopulationAnalyzerContainer';
import {Provider} from 'react-redux';
import store from './Entry';
import {AppPageProps} from '../containers/SessionContainer';
import {PopulationAnalyzerPageProps} from '../containers/PopulationAnalyzerContainer';

export default class App extends React.Component<AppPageProps, any>{

  render() {
    
    let PA = PopulationAnalyzerContainer as any; 
    let pageToRender = this.props.page === "POPULATION_ANALYZER" ?
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
  }


}

