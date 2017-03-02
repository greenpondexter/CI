import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {IpBarChartPageProps} from '../containers/IpBarChartContainer'


export default class IpBarChart extends React.Component<IpBarChartPageProps, any>{

  constructor(props: IpBarChartPageProps){
        super(props);
        
    }

  shouldComponentUpdate(nextProps: IpBarChartPageProps, nextState:IpBarChartPageProps){
    return   this.props.ipDimension !== null ? true : false 
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

    if (typeof(this.props.ipDimension) == "undefined" || this.props.ipDimension === null) return;
    //access ip chart
    let chart = dc.chartRegistry.list('ipBarChart')[0];

    //determine what max is for y-axis
    let yMax : number; 
    yMax = this.props.ipDimension.group(function (d:number) {
        return Math.round(d * 10) / 10;
      }).top(1)[0].value;

    //redraw  
    (chart as any).y(d3.scale.linear().domain([0,yMax]).range([0,yMax]))
            .redraw()
  }

  componentDidMount(prevProps: IpBarChartPageProps, prevState: IpBarChartPageProps){

    if (typeof(this.props.ipDimension) == "undefined" || this.props.ipDimension === null ) return;
      var self = this;

      var dimension = self.props.ipDimension;
      var group = dimension.group(function(d: number){
          return Math.round(d * 10) / 10;
        }
      );

      var dimMax = Math.ceil(dimension.top(1)[0]['cur_pro_ip']);
      var nf1 = d3.format(".1f");

      const chart = dc.barChart('.ipBarChart', 'ipBarChart');
      chart.width(self.props.width)
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
