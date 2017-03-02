import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {AdmitsBarChartPageProps} from '../containers/AdmitsBarChartContainer'

export default class AdmitsBarChart extends React.Component<AdmitsBarChartPageProps, any>{
  constructor(props: AdmitsBarChartPageProps){
        super(props);
        
    }

  shouldComponentUpdate(nextProps: AdmitsBarChartPageProps, nextState:AdmitsBarChartPageProps){
    return   this.props.admitsDimension !== null ? true : false 
  }


  render() {
    var self = this;
    return (
      <div >
        <div className="barChart admitsBarChart" >
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

    if (typeof(this.props.admitsDimension) == "undefined" || this.props.admitsDimension === null) return;
    //access Admits chart
    let chart = dc.chartRegistry.list('admitsBarChart')[0];

    //determine what max is for y-axis
    let yMax: number;
    yMax = this.props.admitsDimension.group().top(1)[0].value;
    //redraw  
    (chart as any).y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw();
  }

  componentDidMount(prevProps: AdmitsBarChartPageProps, prevState: AdmitsBarChartPageProps){

    if (typeof(this.props.admitsDimension) == "undefined" || this.props.admitsDimension === null ) return;
      var self = this;

      var dimension = self.props.admitsDimension;
      var group = dimension.group();


      var dimMax = Math.ceil(dimension.top(1)[0]['qty_admits']);
      var nf1 = d3.format("d");

      const chart = dc.barChart('.admitsBarChart', 'admitsBarChart');
      chart.width(self.props.width)
        .height(self.props.height)
        .dimension(dimension)
        .group(group)
        .xUnits(dc.units.fp.precision(1))
        .x(d3.scale.linear().domain([0, 5]))
        .margins({top: 0, right: 0, bottom: 35, left: 60})
        .yAxisLabel('Member Count')
        .xAxisLabel('Admits')
        .filterPrinter(filters => {
          return 'from ' + nf1(filters[0][0]) + ' to ' + nf1(filters[0][1]);
        })
        .on('filtered', function(chart, filter){
          self.props.onPopulationAnalyzerBrushUpdate();
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

