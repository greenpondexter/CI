
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
          <div className='col-lg-12'>
            <NavBar />
          </div>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <AltContainer stores = {[MemberDataStore]} 
                                      inject = {{
                                        dimension : () => MemberDataStore.getState().prosDimension,
                                        crossfilterSet : () => MemberDataStore.getState().crossfilterSet,
                                        dimensionId: () => "cur_pros_risk_score",
                                        dimensionTitle: () => "Prospective Risk"
                                      }}>
                <TargetedPopArea />
              </AltContainer>
            </Col>
            <Col md={2}></Col>
          </Row>
          <div className='col-lg-12 allCharts'>
           <Row>
            <Col md={1}></Col>
                <Col md={10}>
                  <Panel header="Graph" bsStyle="careinsight">
                    <div className='chartArea' data-step='3' data-intro='Showing data chart'>
                        <Row style={{maxHeight: 570}}>
                          <Col md={5} style={{maxHeight: 570}}>
                            <Row style={{maxHeight: 250}}>
                              <Col md={1}></Col>
                                <Col md={10} style={{maxHeight: 450}}>
                                  <AltContainer stores = {[MemberDataStore]} 
                                                inject = {{
                                                  dimension : () => MemberDataStore.getState().prosDimension,
                                                  crossfilterSet : () => MemberDataStore.getState().crossfilterSet,
                                                  dimensionId: () => "cur_pros_risk_score",
                                                  dimensionTitle: () => "Prospective Risk",
                                                  counter: () => MemberDataStore.getState().counter
                                                } }>
                                    <ProsScatterPlotChart width={400} height={400}/>
                                  </AltContainer>
                                </Col>
                              <Col md={1}></Col>
                            </Row>
                          </Col>
                          <Col md={7}>
                             <Row style={{maxHeight: 250}}>
                                  <Col md={6} style={{maxHeight: 250}}>
                                    <AltContainer stores = {[MemberDataStore]} 
                                                  inject = {{
                                                    dimension : () => MemberDataStore.getState().erDimension,
                                                    crossfilterSet : () => MemberDataStore.getState().crossfilterSet,
                                                    dimensionId: () => "cur_pro_op",
                                                    dimensionTitle: () => "ED Visit Probability",
                                                    counter: () => MemberDataStore.getState().counter
                                                  } }>
                                      <ErBarChart width={330} height={230}/>
                                    </AltContainer>
                                  </Col>
                                  <Col md={6} style={{maxHeight: 250}}>
                                    <AltContainer stores = {[MemberDataStore]} 
                                                  inject = {{
                                                    dimension : () => MemberDataStore.getState().ipDimension,
                                                    crossfilterSet : () => MemberDataStore.getState().crossfilterSet,
                                                    dimensionId: () => "cur_pro_ip",
                                                    dimensionTitle: () => "IP Visit Probability",
                                                    counter: () => MemberDataStore.getState().counter 
                                                  } }>
                                      <IpBarChart width={330} height={230}/>
                                    </AltContainer>
                                  </Col>
                              </Row>
                              <Row style={{maxHeight: 250}}>
                                 <Col md={6} style={{maxHeight: 250}}>
                                    <AltContainer stores = {[MemberDataStore]} 
                                                  inject = {{
                                                    dimension : () => MemberDataStore.getState().edCasesDimension,
                                                    crossfilterSet : () => MemberDataStore.getState().crossfilterSet,
                                                    dimensionId: () => "qty_ed_admits",
                                                    dimensionTitle: () => "ED Cases",
                                                    counter: () => MemberDataStore.getState().counter
                                                  } }>
                                      <EdCasesBarChart width={330} height={240}/>
                                    </AltContainer>
                                  </Col>
                                 <Col md={6} style={{maxHeight: 250}}>
                                    <AltContainer stores = {[MemberDataStore]} 
                                                  inject = {{
                                                    dimension : () => MemberDataStore.getState().admitsDimension,
                                                    crossfilterSet : () => MemberDataStore.getState().crossfilterSet,
                                                    dimensionId: () => "qty_admits",
                                                    dimensionTitle: () => "Admits",
                                                    counter: () => MemberDataStore.getState().counter
                                                  } }>
                                      <AdmitsBarChart width={330} height={240}/>
                                    </AltContainer>
                                  </Col>
                             </Row>
                          </Col>
                        </Row>
                    </div>
                  </Panel>
                </Col>
              <Col md={1}></Col>
          </Row>
            </div>
            <div className='col-lg-12' data-step='5' data-intro='Targeted member list'>
              <Panel header="Members" bsStyle="careinsight">
                <AltContainer stores = {[MemberDataStore]} inject = {{
                    tableSet : () => MemberDataStore.getState().tableSet
                  }}>
                  <TargetedPopTable/>
                </AltContainer>
              </Panel>
            </div>
          </div>
    );
  }

}


PopulationAnalyzer.propTypes = {
  counter : React.PropTypes.array
}     

