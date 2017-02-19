import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import $ from 'jquery';

export default class TargetedPopArea extends React.Component{
  constructor(props){
        super(props);

        this.generateData.bind(this);    
    }

  componentDidUpdate(prevProps, prevState){
    this.generateData();
  }

  componentDidMount(){
    this.generateData()
  }
  
  render() {
      var self = this;
      return (
        <div className={"col-lg-12 " + self.props.dimensionId + "_div"}>
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
                             <h2 className={"font-bold " + self.props.dimensionId + "_targetedPop"}></h2>
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
                             <h2 className={"font-bold " + self.props.dimensionId + "_pmpm"}></h2>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
                <table className="table table-striped table-bordered table-hover scoresTable" id="editable" >
                    <thead >
                      <tr>
                          <th className = "targeted-population-header">Population Risk</th>
                          <th className = "targeted-population-header">Min</th>
                          <th className = "targeted-population-header">Median</th>
                          <th className = "targeted-population-header">Max</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="thinRow">
                      <td className="rowTitle">{self.props.dimensionTitle}</td>
                      <td className={"rowVal " + self.props.dimensionId + "_min"}></td>
                      <td className={"rowVal " + self.props.dimensionId + "_median"}></td>
                      <td className={"rowVal " + self.props.dimensionId + "_max"}></td>
                      </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      );
  }

  generateData(){
     var self = this;

    if (self.dcLoaded == true)
      return;

    //population
    var groupAll = self.props.crossfilterSet.groupAll();
    var numberText = dc.numberDisplay('.' + self.props.dimensionId + '_targetedPop');
    numberText
    .valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(",.0f"))
    .group(groupAll)
    .transitionDuration(500)
    .render();

    //pmpm
    numberText = dc.numberDisplay('.' + self.props.dimensionId + '_pmpm');
    numberText
    .valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format("$,.0f"))
    .group({value: function(){
      var allowedSum = self.props.crossfilterSet.groupAll().reduceSum(function(d){
        return d.amt_paid;
      }).value();
      var monthSum = self.props.crossfilterSet.groupAll().reduceSum(function(d){
        return d.mm_count;
      }).value();
      var pmpm = allowedSum/monthSum;
      return pmpm;
    }})
    .transitionDuration(500)
    .render();

    //median
    numberText = dc.numberDisplay('.' + self.props.dimensionId + '_median');
    numberText.valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(".1f"))
    .group({value: function(){
      var allFocused = self.props.dimension.top(Infinity);
      var median = d3.median(allFocused, l => l[self.props.dimensionId]);
      return median;
    }})
    .render();

    //min
    numberText = dc.numberDisplay('.' + self.props.dimensionId + '_min');
    numberText.valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(".1f"))
    .group({value: function(){
      var min = self.props.dimension.bottom(1)[0]? self.props.dimension.bottom(1)[0][self.props.dimensionId] : '';
      return min;
    }})
    .render();

    //max
    numberText = dc.numberDisplay('.' + self.props.dimensionId + '_max');
    numberText.valueAccessor(function(d){
      return d;
    })
    .formatNumber(d3.format(".1f"))
    .group({value: function(){
      var max = self.props.dimension.top(1)[0]? self.props.dimension.top(1)[0][self.props.dimensionId] : '';
      return max;
    }})
    .render();

    //unmanaged state
    self.dcLoaded = true;

  }

}


