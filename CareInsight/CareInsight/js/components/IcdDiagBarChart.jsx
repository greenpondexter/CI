import React, {PropTyes} from 'react';
import {Row, Col} from 'react-bootstrap'
import d3 from 'd3';
import dc from 'dc';
import $ from 'jquery';
import {fromJS} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MemberProfileActions from '../actions/MemberProfileActions';

export default class IcdDiagChart extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidUpdate(prevProps, prevState){

      let chart = dc.barChart('.IcdDiagChart')

      chart
        .height(180)
        .width(280)
        .margins({top: 10, right: 20, bottom: 30, left: 50})
        .x(d3.scale.ordinal().domain(this.props.icdDiagData.get('icdDiagList')))
        .xUnits(dc.units.ordinal)
        .xAxisLabel('ICDs')
        .y(d3.scale.linear().domain(this.props.icdDiagData.get('paidMinMax')))
        .yAxisLabel('Paid Amount')
        .dimension(this.props.icdDiagData.get('icdDiagDim'))
        .group(this.props.icdDiagData.get('data'))
        
      chart.yAxis().tickFormat((d) => {return d3.format(',d')(d)})
      chart.xAxis().tickValues([]);

      dc.renderAll();
  }

    render(){

        return (
            <div>
                <Row>
                    <Col md={2}></Col>
                    <Col md={6}>
                        <div style={{color:'black'}}>{"Paid by ICD-Diag"}</div>
                    </Col><Col md={2}>
                    </Col>
                  </Row>
                <Row>
                    <div className="IcdDiagChart"></div>
                </Row>
            </div>

        )
    }
}

IcdDiagChart.propTypes = {
    icdDiagData : ImmutablePropTypes.map 
}