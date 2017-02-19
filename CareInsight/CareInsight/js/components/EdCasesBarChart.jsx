import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import MemberActions from '../actions/MemberActions';

export default class EDCasesBarChart extends React.Component{

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
        <div className="barChart edCasesBarChart" >
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
    //access EDCases chart
    let chart = dc.chartRegistry.list('EDCasesBarChart')[0];

    //determine what max is for y-axis
    var yMax = this.props.dimension.group().top(1)[0].value
    //redraw  
    chart.y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw()
  }

  componentDidMount(prevProps, prevState){

      if (typeof(this.props.dimension) == "undefined" || this.props.dimension === null) return;
      
      var self = this;

      var dimension = self.props.dimension;
      var group = dimension.group();

      var dimMax = Math.ceil(dimension.top(1)[0]['qty_EDCases']);
      var nf1 = d3.format("d");

      self.chart = dc.barChart('.edCasesBarChart', 'EDCasesBarChart');
      self.chart.width(self.props.width)
        .height(self.props.height)
        .dimension(dimension)
        .group(group)
        //.xUnits(dc.units.integers)
        .x(d3.scale.linear().domain([0, 5]))
        .margins({top: 0, right: 0, bottom: 35, left: 60})
        .yAxisLabel('Member Count')
        .xAxisLabel('ED Cases')
        .filterPrinter(filters => {
          return 'from ' + nf1(filters[0][0]) + ' to ' + nf1(filters[0][1]);
        })
        .on('filtered', function(chart, filter){
          MemberActions.filterUpdate();
          dc.redrawAll();
        })
        .render();

        //not able to set this on initial render 
        self.chart.xAxis().tickFormat(
           function (v) { return nf1(v)}
         )

        //need to force re-render for xAxis update 
        self.chart.render();
        

    self.dcLoaded = true;
  }
  
  reset(){
    this.chart.filterAll();
    dc.redrawAll();
  }
}


EDCasesBarChart.propTypes = {
  counter : React.PropTypes.number ,
  dimension : React.PropTypes.object
}      