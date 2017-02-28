
import React from 'react';
import d3 from 'd3';
import MemberDataStore from '../stores/MemberDataStore';
import MemberActions from '../actions/MemberActions'
import ErBarChart from './ErBarChart.jsx';
import IpBarChart from './IpBarChart.jsx';
import AdmitsBarChart from './AdmitsBarChart.jsx'
import EdCasesBarChart from './EdCasesBarChart.jsx'
import ProsScatterPlotChart from './ProsScatterPlotChart.jsx';
import MaraConditionHeatMap from './MaraConditionHeatMap';
import TargetedPopArea from './TargetedPopArea.jsx';
import TargetedPopTable from './TargetedPopTable.jsx'
import MemberTable from './MemberTable.jsx';
import ChartNav from './ChartNav.jsx';
import NavBar from './NavBar.jsx';
import AltContainer from 'alt-container';
import {Panel, Row, Col} from 'react-bootstrap';

export default class PopulationAnalyzer extends React.Component{

  constructor(props){
        super(props);   
    }


  render () {
    
    if(this.props.fullSet === null){
      return (<div></div>)
    }

    return (
        <div>
         
          </div>
    );
  }

}


PopulationAnalyzer.propTypes = {
  counter : React.PropTypes.array
}     

