import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {EdCasesBarChartPageProps} from '../containers/EdCasesBarChartContainer'

export default class EDCasesBarChart extends React.Component<EdCasesBarChartPageProps, any>{
  constructor(props: EdCasesBarChartPageProps){
        super(props);
        
    }

  shouldComponentUpdate(nextProps: EdCasesBarChartPageProps, nextState:EdCasesBarChartPageProps){
    return   this.props.edCasesDimension !== null ? true : false 
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

    if (typeof(this.props.edCasesDimension) == "undefined" || this.props.edCasesDimension === null ) return; 
    //access EDCases chart
    let chart = dc.chartRegistry.list('EDCasesBarChart')[0];

    //determine what max is for y-axis
    let yMax : number; 
    yMax = this.props.edCasesDimension.group().top(1)[0].value;
    //redraw  
    (chart as any).y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw();
  }

  componentDidMount(prevProps: EdCasesBarChartPageProps, prevState: EdCasesBarChartPageProps){

      if (typeof(this.props.edCasesDimension) == "undefined" || this.props.edCasesDimension === null) return;
      
      var self = this;

      var dimension = self.props.edCasesDimension;
      var group = dimension.group();

      var dimMax = Math.ceil(dimension.top(1)[0]['qty_EDCases']);
      var nf1 = d3.format("d");

      const chart = dc.barChart('.edCasesBarChart', 'EDCasesBarChart');
      chart.width(self.props.width)
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
          self.props.onPopulationAnalyzerBrushUpdate()
          dc.redrawAll();
        })
        .render();

        //not able to set this on initial render 
        chart.xAxis().tickFormat(
           function (v:number) { return nf1(v)}
         )

        //need to force re-render for xAxis update 
        chart.render();

  }
  
  reset(){
    //this.chart.filterAll();
    dc.redrawAll();
  }
}

