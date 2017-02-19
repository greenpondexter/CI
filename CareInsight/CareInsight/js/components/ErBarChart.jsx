import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MemberActions from '../actions/MemberActions';

export default class ErBarChart extends React.Component{
  constructor(props){
        super(props);
        
    }

  shouldComponentUpdate(nextProps, nextState){
    return  (this.props.counter.get(0) != nextProps.counter.get(0) 
            || this.props.counter.get(0) == 0 ) &&
            this.props.dimension !== null 
            
            ? true : false; 
  }

  render() {
    var self = this;
    return (
      <div>
        <div className="barChart erBarChart" >
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
           <div className="chartControls">
            <div className="chartStatus">
            </div>
          </div>
          </Col>
          <Col md={1}></Col>
        </Row>
        </div>
      </div>
    );
  }

  componentDidUpdate(){

    if (typeof(this.props.dimension) == "undefined" || this.props.dimension === null ) return;
      //access er chart
       let chart = dc.chartRegistry.list('erBarChart')[0];

       //determine what max is for y-axis
       var yMax = this.props.dimension.group(function (d) {
         return Math.round(d * 10) / 10;
       }).top(1)[0].value
      
       //redraw 
       chart.y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw()
  }

  componentDidMount(prevProps, prevState){

    if (typeof(this.props.dimension) == "undefined" || this.props.dimension === null ) return;
      var self = this;

      var dimension = self.props.dimension;
      var group = dimension.group(function(d){
          return Math.round(d * 10) / 10;
        }
      );
      var dimMax = Math.ceil(dimension.top(1)[0]['cur_pro_op']);
      var yMax = dimension.group(function (d) {
        return Math.round(d * 10) / 10;
      }).top(1)[0].value
      var nf1 = d3.format(".1f");

      self.chart = dc.barChart('.erBarChart', 'erBarChart');
      self.chart.width(self.props.width)
        .height(self.props.height)
        .dimension(dimension)
        .group(group)
        .xUnits(dc.units.fp.precision(0.1))
        .x(d3.scale.linear().domain([0, 5]))
        .margins({top: 0, right: 0, bottom: 35, left: 60})
        .xAxisLabel('ED Visit Risk')
        .yAxisLabel('Member Count')
        .filterPrinter(filters => {
          return 'from ' + nf1(filters[0][0]) + ' to ' + nf1(filters[0][1]);
        })
        .on('filtered', function(chart, filter){
          var c = chart;
          var f = filter;
          MemberActions.filterUpdate();
          dc.redrawAll();
        })
        .render();

    self.dcLoaded = true;
  }

  reset(){
    this.chart.filterAll();
    dc.redrawAll();
  }
}

ErBarChart.propTypes = {
  counter : ImmutablePropTypes.list,
  dimension : React.PropTypes.object 
}

module.exports = ErBarChart;
