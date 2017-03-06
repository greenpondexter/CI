import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {AgeBarChartPageProps} from '../containers/AgeBarChartContainer'

export default class AgeBarChart extends React.Component<AgeBarChartPageProps, any>{
  constructor(props: AgeBarChartPageProps){
        super(props);
    }

  shouldComponentUpdate(nextProps: AgeBarChartPageProps, nextState: AgeBarChartPageProps){
     return   this.props.ageDimension !== null ? true : false 
  }

  render() {
    var self = this;
    return (
      <div>
        <div className="barChart ageBarChart" >
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

    if (typeof(this.props.ageDimension) == "undefined" || this.props.ageDimension === null ) return;
      //access er chart
       let chart = dc.chartRegistry.list('ageBarChart')[0];

       //determine what max is for y-axis
       let yMax : number; 
       yMax = this.props.ageDimension.group(function (d:number) {
         return d; 
       }).top(1)[0].value;
      
       //redraw 
       (chart as any).y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw()
  }

  componentDidMount(prevProps: AgeBarChartPageProps, prevState: AgeBarChartPageProps){

    if (typeof(this.props.ageDimension) == "undefined" || this.props.ageDimension === null ) return;
      var self = this;

      var dimension = self.props.ageDimension;
      var group = dimension.group(function(d:any){
          return d;
        }
      );
      var dimMax = Math.ceil(dimension.top(1)[0]['amt_allowed']);
      var yMax = dimension.group(function (d:any) {
        return d;
      }).top(1)[0].value
      var nf1 = d3.format(".1f");

      const chart = dc.barChart('.ageBarChart', 'ageBarChart');
      chart.width(self.props.width)
        .height(self.props.height)
        .dimension(dimension)
        .group(group)
        .xUnits(dc.units.fp.precision(1))
        .x(d3.scale.linear().domain([0, 100]))
        .margins({top: 0, right: 0, bottom: 35, left: 60})
        .xAxisLabel('Age')
        .yAxisLabel('Member Count')
        .filterPrinter((filters: any) => {
          return 'from ' + nf1(filters[0][0]) + ' to ' + nf1(filters[0][1]);
        })
        .on('filtered', function(chart: any, filter: any){
            self.props.onPopulationAnalyzerBrushUpdate()
            dc.redrawAll();
        })
        .render();

  }

  reset(){
    dc.redrawAll();
  }
}
