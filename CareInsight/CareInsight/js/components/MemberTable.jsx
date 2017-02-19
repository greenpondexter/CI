import React from 'react';
import FixedDataTable from 'fixed-data-table';
import {Table, Column} from 'fixed-data-table'; 

var MemberTable = React.createClass({

  render: function () {
    var self = this;
    var visibleClassName = self.props.visible == true? '' : 'hidden';

    return (
      
      <div className = {visibleClassName}>
        <Table rowHeight={50} rowGetter={self.getRow} rowsCount={self.dataArray? self.dataArray.length: 0 } width={1400} height={600} headerHeight={50}>
          <Column width={300} dataKey={0} label="Name" />
          <Column width={200} dataKey={1} label="Member Month" />
          <Column width={200} dataKey={2} label="Allowed" />
          <Column width={200} dataKey={3} label="Admits" />
          <Column width={200} dataKey={4} label="Avg LOS" />
          <Column width={200} dataKey={5} label="ED Cases" />
          <Column width={200} dataKey={6} label="Days" />
          <Column width={200} dataKey={10} label="Previous Prospective" />
          <Column width={200} dataKey={7} label="Current Prospective" />
          <Column width={200} dataKey={15} label="Previous ER" />
          <Column width={200} dataKey={16} label="Current ER" />
          <Column width={200} dataKey={13} label="Previous IP" />
          <Column width={200} dataKey={14} label="Current IP" />
          <Column width={200} dataKey={11} label="Previous PC" />
          <Column width={200} dataKey={8} label="Current PC" />
          <Column width={200} dataKey={9} label="LOB" />
          <Column width={200} dataKey={12} label="Previous PT" />
        </Table>
      </div>
    );
  },
  getRow: function(index){
    // don't build row dynamically here. The performance will suffer.
    var self = this;
    if (self.dataArray){
      return self.dataArray[index];
    }
    else
      return null;
  },
  componentWillUpdate: function(nextProps, nextState){
    var self = this;
    // Must build an array of array for best performnace of FixedDataTable
    // Trade of memory with performance
    // May slow down the init of app. If so, should move it into a single page with FixedDataTable
    if(nextProps.visible == true){

      var dimension = null, dimensionId = null;
      if (nextProps.prosDim.visible() == 'dimFadeIn'){
        dimension = nextProps.prosDim.dimension();
        dimensionId = self.props.prosDim.dimensionId;
      }
      else if (nextProps.erDim.visible() == 'dimFadeIn'){
        dimension = nextProps.erDim.dimension();
        dimensionId = self.props.erDim.dimensionId;
      }
      else if (nextProps.ipDim.visible() == 'dimFadeIn'){
        dimension = nextProps.ipDim.dimension();
        dimensionId = self.props.ipDim.dimensionId;
      }

      self.dataArray = [];
      var members = dimension.bottom(Infinity);
      for(var i = 0; i < members.length; i++){
          var row = [];
          for(var j in members[i]){
              row = row.concat(members[i][j]);
          }
          row = row.concat(members[i][dimensionId]);
          self.dataArray.push(row);
      }
      self.dataArray.sort((a, b) => b[17] - a[17]);
    }
  }
});

module.exports = MemberTable;
