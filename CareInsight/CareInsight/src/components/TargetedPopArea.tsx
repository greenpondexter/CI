import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';

import {TargetedPopAreaPageProps} from '../containers/TargetedPopAreaContainer'

export default class TargetedPopArea extends React.Component<TargetedPopAreaPageProps, any>{
    constructor(props: TargetedPopAreaPageProps){
        super(props);

        this.generateData.bind(this);    
    }

  componentDidUpdate(prevProps: TargetedPopAreaPageProps, prevState: TargetedPopAreaPageProps){
    this.generateData();
  }

  componentDidMount(){
    this.generateData()
  }


    render(){
       let self = this; 
       return(
           <div>
          <Row>
            <Col md={2}></Col>
                <Col md={8}>
                    <div className={"col-lg-12 cur_pros_risk_score_div"}>
                        <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Targeted Population</h5>
                        </div>
                        <div className="ibox-content boxContentNoPadding">
                            <div className= 'row noPaddingRow'>
                            <div className="col-lg-6">
                                <div className="widget style1 navy-bg">
                                <div className="row vertical-align">
                                    <div className="col-xs-3">
                                        <i>Target Members:</i>
                                        <i className="fa fa-user fa-3x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <h2 className={"font-bold cur_pros_risk_score_targetedPop"}></h2>
                                        <div className={"font-bold cur_pros_risk_score_targetedPop"}>{this.props.totalPopulationStats.member_count}</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="widget style1 navy-bg">
                                <div className="row vertical-align">
                                    <div className="col-xs-3">
                                        <i>PMPM:</i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <h2 className={"font-bold cur_pros_risk_score_pmpm"}></h2>
                                        <div className={"font-bold cur_pros_risk_score_pmpm"}>{this.props.totalPopulationStats.pmpm}</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <table className="table table-striped table-bordered table-hover scoresTable" id="editable" >
                                <thead >
                                <tr>
                                    <th className = "targeted-population-header">Population Risk</th>
                                    <th className = "targeted-population-header">Min (Targeted)</th>
                                    <th className = "targeted-population-header">Min (Entire)</th>
                                    <th className = "targeted-population-header">Median (Targeted)</th>
                                    <th className = "targeted-population-header">Median (Entire)</th>
                                    <th className = "targeted-population-header">Max (Targeted)</th>
                                    <th className = "targeted-population-header">Max (Entire)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="thinRow">
                                    <td className="rowTitle">{"Prospective Risk"}</td>
                                    <td className={"rowVal cur_pros_risk_score_min"}></td>
                                    <td className={"rowVal "}>{self.props.totalPopulationStats.min}</td>
                                    <td className={"rowVal cur_pros_risk_score_median"}></td>
                                    <td className={"rowVal "}>{self.props.totalPopulationStats.median}</td>
                                    <td className={"rowVal cur_pros_risk_score_max"}></td>
                                    <td className={"rowVal "}>{self.props.totalPopulationStats.max}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </Col>
            <Col md={2}></Col>
          </Row>
            </div>
       ) 
    }

    generateData(){

    // if (this.dcLoaded == true)
    //   return;

    //population
    var groupAll = this.props.crossFilterSet.groupAll();
    var numberText = dc.numberDisplay('.cur_pros_risk_score_targetedPop');
    numberText
    .valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(",.0f"))
    .group(groupAll)
    .transitionDuration(500)
    .render();

    var self = this; 
    //pmpm
    numberText = dc.numberDisplay('.cur_pros_risk_score_pmpm');
    numberText
    .valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format("$,.0f"))
    .group({value: function(){
      var allowedSum = self.props.crossFilterSet.groupAll().reduceSum(function(d:any){
        return d.amt_paid;
      }).value();
      var monthSum = self.props.crossFilterSet.groupAll().reduceSum(function(d:any){
        return d.mm_count;
      }).value();
      var pmpm = allowedSum/monthSum;
      return pmpm;
    }})
    .transitionDuration(500)
    .render();

    //median
    numberText = dc.numberDisplay('.cur_pros_risk_score_median');
    numberText.valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(".1f"))
    .group({value: function(){
      var allFocused = self.props.prosDimension.top(Infinity);
      var median = d3.median(allFocused, l => (l as any)['cur_pros_risk_score']);
      return median;
    }})
    .render();

    //min
    numberText = dc.numberDisplay('.cur_pros_risk_score_min');
    numberText.valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(".1f"))
    .group({value: function(){
      var min = self.props.prosDimension.bottom(1)[0]? self.props.prosDimension.bottom(1)[0]["cur_pros_risk_score"] : '';
      return min;
    }})
    .render();

    //max
    numberText = dc.numberDisplay('.cur_pros_risk_score_max');
    numberText.valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(".1f"))
    .group({value: function(){
      var max = self.props.prosDimension.top(1)[0]? self.props.prosDimension.top(1)[0]["cur_pros_risk_score"] : '';
      return max;
    }})
    .render();

    //unmanaged state
    //this.dcLoaded = true;

  }


} 