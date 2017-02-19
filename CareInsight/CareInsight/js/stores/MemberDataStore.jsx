import Alt from '../alt.js';
import $ from 'jquery';
import crossfilter from 'crossfilter'
import MemberActions from '../actions/MemberActions';
var data = data || {}
import {List, Map, Set, toJS, fromJS} from 'immutable'
import alasql from 'alasql';
import _ from 'lodash';


class MemberStore {
  constructor() {
    this.bindActions(MemberActions)
    //must use a root object with properties as state
    //use a object directly will not pass the state to the AltContainer
     
      this.fullSet = null,
      this.crossfilterSet = null,
      this.tableSet = [], 

      this.membersSelected = null, 
      this.erDimension = null,
      this.prosDimension = null,
      this.admitsDimension = null,
      this.edCasesDimension = null,  
      
      this.conditionTreeMap = null, 
      this.visibleDimName = 'er',
      this.visibleTable = 'targeted',
      this.size = 0,
      this.counter = List.of(0);
      this.error = null;
    

    this.onLoadMemberData.bind(this);
    this.onProcessMemberData.bind(this);
    this.generateTestData.bind(this);
    this.generateMemberTable.bind(this);
  }

  //action handler that needs to call function that makes ajax request 
  onLoadMemberData(){
    this.generateTestData(); 
  }

  onProcessMemberData(){
     
      // Create smaller obj with only keys that we need for crossfilter 
      var result = _.map(this.fullSet, function(d){
        return {
                member_key : d.member_key,  
                prev_pros_risk_score : d.prev_pros_risk_score,
                cur_pros_risk_score : d.cur_pros_risk_score,
                cur_pro_op : d.cur_pro_op,
                cur_pro_ip : d.cur_pro_ip,
                qty_admits : d.qty_admits,
                qty_ed_admits : d.qty_ed_admits,
                mm_count : d.mm_count,
                amt_paid: d.amt_paid
              }
      })

      //create the crossfilter object 
      this.crossfilterSet = crossfilter(result);
      // dimension for scatter plot chart
      this.prosDimension = this.crossfilterSet.dimension(function(d){ return [+d.prev_pros_risk_score, +d.cur_pros_risk_score]});
      // dimension for er bar chart
      this.erDimension = this.crossfilterSet.dimension(function(d){ return d.cur_pro_op});
      // dimension for ip bar chart
      this.ipDimension = this.crossfilterSet.dimension(function(d){ return d.cur_pro_ip});
      // dimension for admits breakdown bar chart 
      this.admitsDimension = this.crossfilterSet.dimension(function(d){ return d.qty_admits})
      // dimension for admits breakdown bar chart 
      this.edCasesDimension = this.crossfilterSet.dimension(function(d){ return d.qty_ed_admits})

      this.membersSelected = this.crossfilterSet.dimension(function(d){return d.member_key})

      this.size = result.length;


      //force a re-render 
      this.counter = this.counter.set('0', (this.counter.get(0) + 1));

      this.generateMemberTable();
      this.emitChange(); 
  }


  generateMemberTable(){

    const fS = this.fullSet;
    const keys = this.membersSelected.group().all()

    alasql.fn.convertToMoney = (d) => {return '$' + d.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}

    this.tableSet = alasql(`SELECT 
                            fS.member_key
                            ,fS.mm_count
                            ,convertToMoney(fS.amt_paid) amt_paid
                            ,convertToMoney(fS.amt_allowed) amt_allowed
                            ,fS.qty_ed_admits
                            ,fS.qty_admits
                            ,fS.cur_pros_risk_score
                            ,fS.prev_pros_risk_score
                            ,fS.prev_pro_op
                            ,fS.cur_pro_op
                            ,fS.prev_pro_ip
                            ,fS.cur_pro_ip
                            from ? fS 
                            join ? keys 
                              on CAST(fS.member_key AS NUMBER) = keys.key 
                            where keys.value = 1`,[fS,keys])
  }
  
  generateTestData(){

        //event listener for json request 
        function responseListener (self, pars) {
          self.fullSet = JSON.parse(pars.target.responseText).data 
          self.onProcessMemberData();
        }

        var self = this; 
        
        //create an send XMLHttpRequest
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", responseListener.bind(null, self));
        const page =  document.getElementById("CareInsightApp").getAttribute("data") + "PopulationAnalyzer/TestPopulationAnalyzerData.json"
        oReq.open("GET", page);
        oReq.send();
  }

  

  onFilterUpdate(){
    this.generateMemberTable()
    this.counter = this.counter.set('0', (this.counter.get(0) + 1)) ;    
  }
}

module.exports = Alt.createStore(MemberStore, 'MemberStore');