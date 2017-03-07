import * as  React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {ClaimDollarsBarChartPageProps} from '../containers/ClaimDollarsBarChartContainer'

export default class ClaimDollarsBarChart extends React.Component<ClaimDollarsBarChartPageProps, any>{
  constructor(props:ClaimDollarsBarChartPageProps){
        super(props);
    }

  shouldComponentUpdate(nextProps: ClaimDollarsBarChartPageProps, nextState: ClaimDollarsBarChartPageProps){
      return   this.props.allowedDimension !== null ? true : false 
  }
  
  render() {
    var self = this;
    return (
      <div>
        <div className="barChart claimDollarsBarChart" >
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

    if (typeof(this.props.allowedDimension) == "undefined" || this.props.allowedDimension === null ) return;
      //access er chart
       let chart = dc.chartRegistry.list('claimDollarsBarChart')[0];

       //determine what max is for y-axis
       let yMax : number; 
       yMax = this.props.allowedDimension.group(function (d:number) {
         return Math.round(d / 10000) * 10000;
       }).top(1)[0].value;
      
       //redraw 
       (chart as any).y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw()
  }

  componentDidMount(prevProps: ClaimDollarsBarChartPageProps, prevState: ClaimDollarsBarChartPageProps){

    if (typeof(this.props.allowedDimension) == "undefined" || this.props.allowedDimension === null ) return;
      var self = this;

      var dimension = self.props.allowedDimension;
      var group = dimension.group(function(d: number){
          return Math.round(d/10000) * 10000;
        }
      );
      var dimMax = Math.ceil(dimension.top(1)[0]['amt_allowed']);
      var yMax = dimension.group(function (d:number) {
        return Math.round(d /10000) * 10000;
      }).top(1)[0].value
      const nf1 = d3.format(".1f");
      const nf2 = d3.format("$,")

      let chart = dc.barChart('.claimDollarsBarChart', 'claimDollarsBarChart');
      chart.width(self.props.width)
        .height(self.props.height)
        .dimension(dimension)
        .group(group)
        .xUnits(dc.units.fp.precision(50000))
        .x(d3.scale.linear().domain([0, 500000]))
        .margins({top: 20, right: 20, bottom: 55, left: 60})
        .xAxisLabel('Claim Dollars (Allowed)')
        .yAxisLabel('Member Count')
        .filterPrinter((filters: any) => {
          return 'from ' + nf1(filters[0][0]) + ' to ' + nf1(filters[0][1]);
        })
        .on('filtered', function(chart: any, filter: any){
          self.props.onPopulationAnalyzerBrushUpdate()
          dc.redrawAll();
        })
        .on('renderlet', function(chart: any){
             chart.selectAll("g.x text")
                .attr('transform', "rotate(-65) translate(-20,0)");
        })
        .render();

        chart.xAxis().tickFormat(
           function (v:any) { return nf2(v)}
         )

        chart.render();


  }

  reset(){
    //this.chart.filterAll();
    dc.redrawAll();
  }
}
