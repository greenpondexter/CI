import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import MemberActions from '../actions/MemberActions';

export default class IpBarChart extends React.Component{

  constructor(props){
        super(props);
        
    }

  shouldComponentUpdate(nextProps, nextState){
      return (this.props.counter.get(0) != nextProps.counter.get(0) 
            || this.props.counter.get(0) == 0) &&
            this.props.dimension !== null 
            ? true : false; 
  }

  render() {
    var self = this;
    return (
      <div >
        <div className="barChart ipBarChart" >
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

    if (typeof(this.props.dimension) == "undefined" || this.props.dimension === null) return;
    //access ip chart
    let chart = dc.chartRegistry.list('ipBarChart')[0];

    //determine what max is for y-axis
    let yMax = this.props.dimension.group(function (d) {
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

      var dimMax = Math.ceil(dimension.top(1)[0]['cur_pro_ip']);
      var nf1 = d3.format(".1f");

      self.chart = dc.barChart('.ipBarChart', 'ipBarChart');
      self.chart.width(self.props.width)
        .height(self.props.height)
        .dimension(dimension)
        .group(group)
        .xUnits(dc.units.fp.precision(0.1))
        .x(d3.scale.linear().domain([0, 5]))
        .margins({top: 0, right: 0, bottom: 35, left: 60})
        .yAxisLabel('Member Count')
        .xAxisLabel('IP Visit Risk')
        .filterPrinter(filters => {
          return 'from ' + nf1(filters[0][0]) + ' to ' + nf1(filters[0][1]);
        })
        .on('filtered', function(chart, filter){
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


IpBarChart.propTypes = {
  counter : React.PropTypes.number ,
  dimension : React.PropTypes.object
}