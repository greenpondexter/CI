import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {ErBarChartPageProps} from '../containers/ErBarChartContainer'

export default class ErBarChart extends React.Component<ErBarChartPageProps,any>{
  constructor(props:ErBarChartPageProps){
        super(props);
    }

  shouldComponentUpdate(nextProps: ErBarChartPageProps, nextState:ErBarChartPageProps){
    return   this.props.erDimension !== null ? true : false 
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

    if (typeof(this.props.erDimension) == "undefined" || this.props.erDimension === null ) return;
      //access er chart
       let chart = dc.chartRegistry.list('erBarChart')[0];

       //determine what max is for y-axis
       let yMax: number;
       yMax = this.props.erDimension.group(function (d:number) {
         return Math.round(d * 10) / 10;
       }).top(1)[0].value;
      
       //redraw 
       (chart as any).y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw();
  }

  componentDidMount(prevProps: ErBarChartPageProps, prevState: ErBarChartPageProps){

    if (typeof(this.props.erDimension) == "undefined" || this.props.erDimension === null ) return;
      var self = this;

      var dimension = self.props.erDimension;
      var group = dimension.group(function(d:number){
          return Math.round(d * 10) / 10;
        }
      );
      var dimMax = Math.ceil(dimension.top(1)[0]['cur_pro_op']);
      var yMax = dimension.group(function (d:number) {
        return Math.round(d * 10) / 10;
      }).top(1)[0].value
      var nf1 = d3.format(".1f");

      const chart = dc.barChart('.erBarChart', 'erBarChart');
      chart.width(self.props.width)
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
          self.props.onPopulationAnalyzerBrushUpdate()
          dc.redrawAll();
          
        })
        .render();

  }

  reset(){
    //this.chart.filterAll();
    dc.redrawAll();
  }
}
