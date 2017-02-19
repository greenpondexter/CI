import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import MemberActions from '../actions/MemberActions';
import $ from 'jquery';

export default class ScatterPlotChart extends React.Component{
  constructor(props){
        super(props);   
    }
  


  render() {
      var self = this;
      return (
        <div >
          <div className="barChart prosScatterPlotChart" >
            <Row>
              <Col md={12}>
                <div className="chartControls reset" style={{display: "none"}}>
                  <div className="chartStatus">
                    Total Prospective Risk Score Filter: <span className='filter'></span>
                    <span className="reset">
                      (<a onClick={this.reset} >Clear</a>)
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
  }

  componentDidMount(prevProps, prevState){

      if (typeof(this.props.dimension) == "undefined" || this.props.dimension === null) return; 

      var self = this;
      if (self.props.visible == 'dimFadeIn')
        $('.prosScatterPlotChart').parent().hide().fadeIn(500);

      if (self.dcLoaded == true)
        return;

      var dimension = self.props.dimension;
      var group = dimension.group(function(d){
        return [(Math.round(d[0] * 10) / 10),
                ( Math.round(d[1] * 10) / 10) ]  
      });
      var nf1 = d3.format(".1f");

      self.chart = dc.scatterPlot('.prosScatterPlotChart');
      self.chart.width(self.props.width)
        .height(self.props.height)
        .symbolSize(8)
        .clipPadding(10)
        .dimension(dimension)
        .x(d3.scale.linear().domain([0, 6]))
        .group(group)
        .brushOn(true)
        .xAxisLabel('Prior Total Prospective Risk Score')
        .yAxisLabel('Current Total Propspective Risk Score')
        .filterPrinter(filters => {
          return 'Prior [' + nf1(filters[0][0][0]) + " -> " + nf1(filters[0][1][0]) + ']'
          + ' Current [' + nf1(filters[0][0][1]) + " -> " + nf1(filters[0][1][1]) + ']'
        })
        .on('postRedraw', function(chart){
          var c = chart;
        })
        .on('filtered', function(chart, filter){
          var c = chart;
          var f = filter;
          MemberActions.filterUpdate();
          dc.redrawAll();
        })
        //.mouseZoomable(true)
        .render();
    self.dcLoaded = true;
  }

  reset(){
    this.chart.filterAll();
    dc.redrawAll();
  }
}


