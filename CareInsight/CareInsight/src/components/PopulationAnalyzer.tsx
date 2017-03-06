
import * as React from 'react';
import * as d3 from 'd3';
import {TargetedPopAreaPageProps} from '../containers/TargetedPopAreaContainer'
import {Provider} from 'react-redux'
import NavBar from './NavBar';
import {TargetedPopAreaContainer} from '../containers/TargetedPopAreaContainer'
import {ProsScatterPlotChartContainer} from '../containers/ProsScatterPlotChartContainer'
import {ErBarChartContainer} from '../containers/ErBarChartContainer'
import {IpBarChartContainer} from '../containers/IpBarChartContainer'
import {EdCasesBarChartContainer} from '../containers/EdCasesBarChartContainer'
import {AdmitsBarChartContainer} from '../containers/AdmitsBarChartContainer'
import {FilterPaneContainer} from '../containers/FilterPaneContainer'
import {TargetedPopTableContainer} from '../containers/TargetedPopTableContainer'
import {ClaimDollarsBarChartContainer} from '../containers/ClaimDollarsBarChartContainer'
import {AgeBarChartContainer} from '../containers/AgeBarChartContainer'
import store from './Entry'
import {Panel, Row, Col} from 'react-bootstrap'

export default class PopulationAnalyzer extends React.Component<TargetedPopAreaPageProps, any>{
  constructor(props: TargetedPopAreaPageProps){
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
            <TargetedPopAreaContainer/>
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
                                    <ProsScatterPlotChartContainer/>
                                </Col>
                              <Col md={1}></Col>
                            </Row>
                          </Col>
                            <Col md={7}>
                             <Row style={{maxHeight: 250}}>
                                  <Col md={4} style={{maxHeight: 250}}>
                                      <ClaimDollarsBarChartContainer/>
                                  </Col>
                                  <Col md={4} style={{maxHeight: 250}}>
                                      <ErBarChartContainer/>
                                  </Col>
                                  <Col md={4} style={{maxHeight: 250}}>
                                      <IpBarChartContainer/>
                                  </Col>
                              </Row>
                              <Row style={{maxHeight: 250}}>
                                <Col md={4} style={{maxHeight: 250}}>
                                      <AgeBarChartContainer/>
                                  </Col>
                                 <Col md={4} style={{maxHeight: 250}}>
                                      <EdCasesBarChartContainer/>
                                  </Col>
                                 <Col md={4} style={{maxHeight: 250}}>
                                      <AdmitsBarChartContainer/>
                                  </Col>
                             </Row>
                          </Col>
                        </Row>
                    </div>
                  </Panel>
                </Col>
              <Col md={1}></Col>
          </Row>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
                <FilterPaneContainer/>
            </Col>
            <Col md={2}></Col>
          </Row>
            </div>
            <div className='col-lg-12' data-step='5' data-intro='Targeted member list'>
              <Panel header="Members" bsStyle="careinsight">
                  <TargetedPopTableContainer/>
              </Panel>
            </div>*/}
          </div>
    );
  }

}



