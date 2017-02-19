import React, {PropTyes} from 'react';
import {Row, Col} from 'react-bootstrap'
import d3 from 'd3';
import dc from 'dc';
import $ from 'jquery';
import {fromJS} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MemberProfileActions from '../actions/MemberProfileActions';

export default class HcgBreakdownPieChart extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidUpdate(prevProps, prevState){

     const chart = dc.pieChart('.hcgChart')

      chart
        .height(180)
        .width(180)
        .dimension(this.props.hcgData.get('setting'))
        .group(this.props.hcgData.get('data'))
        .radius(80)
        .innerRadius(30)
        .render()
  }

    render(){

        return (
            <div>
                <Row>
                    <Col md={2}></Col>
                    <Col md={6}>
                        <div style={{color:'black'}}>{"Paid by HCG Setting"}</div>
                    </Col><Col md={2}>
                    </Col>
                </Row>
                <div className="hcgChart"></div>
            </div>

        )
    }
}

HcgBreakdownPieChart.propTypes = {
     hcgData : React.PropTypes.object 
}