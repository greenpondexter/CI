import {call, put, take, takeLatest, takeEvery} from 'redux-saga/effects' 
import * as crossfilter from 'crossfilter';
import {List, Map, Set, fromJS} from 'immutable'
import * as alasql from 'alasql';
import * as _ from 'lodash';
import {LOAD_POP_ANALYZER} from '../actions/actionsInterface'

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* loadPopAnalyzerSaga() {
  const initDataset = yield call(ajaxRequest());
  const proccessedMembers: ProcessMemberSet = processMemberData(initDataset);
  const finalOutput : LOAD_POP_ANALYZER = {
    fullSet : initDataset,
    crossFilterSet : proccessedMembers.crossfilterSet,
    membersSelected : proccessedMembers.membersSelected
  } 
  yield put({ type: 'LOAD_POP_ANALYZER', payload: finalOutput})
}

function* initializeProfileStore():any{
  yield takeEvery('TRIGGER_POP_ANALYZER_LOAD', loadPopAnalyzerSaga)
}

export function* rootSaga(): any{
   yield [
    initializeProfileStore()
  ] 
}


function ajaxRequest():any{
        
        return () => {
          
          return new Promise(function(resolve,reject){
           
            const oReq = new XMLHttpRequest();
            const page =  document.getElementById("CareInsightApp").getAttribute("data") + "PopulationAnalyzer/TestPopulationAnalyzerData.json"

            oReq.open("GET", page);

            oReq.onload = () => {
              oReq.status === 200 ? resolve(JSON.parse(oReq.response).data) : reject(new Error(oReq.statusText));
            };
      
            oReq.onerror = () => {
              reject(new Error("Network error"));
            };

            oReq.send();

        }
       )
      }
}


interface IfullSet {
  member_key : number,  
  prev_pros_risk_score : number;
  cur_pros_risk_score : number;
  cur_pro_op : number;
  cur_pro_ip : number,
  qty_admits : number,
  qty_ed_admits : number,
  mm_count : number,
  amt_paid: number 
  
}

interface ProcessMemberSet {
  crossfilterSet : any;
  membersSelected : any;
}

function processMemberData(fullSet: Array<IfullSet>):ProcessMemberSet{
  
  // Create smaller obj with only keys that we need for crossfilter 
      var result = _.map(fullSet, function(d){
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
      let _crossfilterSet = crossfilter(result);
      // dimension for scatter plot chart
      let prosDimension = _crossfilterSet.dimension(function(d){ return [+d.prev_pros_risk_score, +d.cur_pros_risk_score]});
      // dimension for er bar chart
      let erDimension = _crossfilterSet.dimension(function(d){ return d.cur_pro_op});
      // dimension for ip bar chart
      let ipDimension = _crossfilterSet.dimension(function(d){ return d.cur_pro_ip});
      // dimension for admits breakdown bar chart 
      let admitsDimension = _crossfilterSet.dimension(function(d){ return d.qty_admits})
      // dimension for admits breakdown bar chart 
      let edCasesDimension = _crossfilterSet.dimension(function(d){ return d.qty_ed_admits})

      let _membersSelected = _crossfilterSet.dimension(function(d){return d.member_key})

      return {
        crossfilterSet : _crossfilterSet,
        membersSelected : _membersSelected
      }

      //generateMemberTable();
}

