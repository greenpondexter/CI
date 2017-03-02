import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {ProsScatterPlotChartPageProps} from '../containers/ProsScatterPlotChartContainer'

export default class ProsScatterPlotChart extends React.Component<ProsScatterPlotChartPageProps,any>{
  constructor(props: ProsScatterPlotChartPageProps){
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

  componentDidMount(prevProps: ProsScatterPlotChartPageProps, prevState: ProsScatterPlotChartPageProps){

      if (typeof(this.props.prosDimension) == "undefined" || this.props.prosDimension === null) return; 

      var self = this;
      
      var dimension = self.props.prosDimension;
      var group = dimension.group(function(d:Array<number>){
        return [(Math.round(d[0] * 10) / 10),
                ( Math.round(d[1] * 10) / 10) ]  
      });
      var nf1 = d3.format(".1f");

      let chart = dc.scatterPlot('.prosScatterPlotChart');
      chart.width(self.props.width)
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
          //MemberActions.filterUpdate();
          self.props.onPopulationAnalyzerBrushUpdate();
          dc.redrawAll();
        })
        //.mouseZoomable(true)
        .render();
   
  }

  reset(){
    //chart.filterAll();
    dc.redrawAll();
  }
}


