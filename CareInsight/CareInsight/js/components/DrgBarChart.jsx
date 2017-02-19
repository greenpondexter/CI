import React, {PropTyes} from 'react';
import {Row, Col} from 'react-bootstrap'
import d3 from 'd3';
import dc from 'dc';
import $ from 'jquery';
import {fromJS} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MemberProfileActions from '../actions/MemberProfileActions';

export default class DrgChart extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidUpdate(prevProps, prevState){

      let chart = dc.barChart('.drgChart')


      chart
        .height(180)
        .width(280)
        .margins({top: 10, right: 20, bottom: 30, left: 50})
        .x(d3.scale.ordinal().domain(this.props.drgData.get('drgList')))
        .xUnits(dc.units.ordinal)
        .xAxisLabel('DRGs')
        .y(d3.scale.linear().domain(this.props.drgData.get('paidMinMax')))
        .yAxisLabel('Paid Amount')
        .dimension(this.props.drgData.get('drgDim'))
        .group(this.props.drgData.get('data'))
        
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
                        <div style={{color:'black'}}>{"Paid by DRG"}</div>
                    </Col><Col md={2}>
                    </Col>
                  </Row>
                <Row>
                    <div className="drgChart"></div>
                </Row>
            </div>

        )
    }
}

DrgChart.propTypes = {
    drgData : ImmutablePropTypes.map 
}