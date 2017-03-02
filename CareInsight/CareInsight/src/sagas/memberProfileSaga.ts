import {call, fork, put, take, takeLatest, takeEvery, select} from 'redux-saga/effects' 
import * as crossfilter from 'crossfilter';
import {List, Map, Set, fromJS} from 'immutable'
import * as alasql from 'alasql';
import * as _ from 'lodash';
import {LOAD_POP_ANALYZER, BRUSH_UPDATE} from '../actions/actionsInterface'
import store from '../../js/Entry'
import {getEntireTree} from '../reducers/selectors'



export function* rootSaga(): any{
   yield [
    fork(initializeProfileStore),
    fork(handleBrushEvent)
  ] 
}

function* initializeProfileStore():any{
  yield takeEvery('TRIGGER_POP_ANALYZER_LOAD', loadPopAnalyzerSaga)
}

function* handleBrushEvent():any{
  yield takeEvery('TRIGGER_BRUSH_UPDATE', processBrushEventSaga)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* loadPopAnalyzerSaga() {
  const initDataset = yield call(ajaxRequest());
  const proccessedMembers: ProcessMemberSet = processMemberData(initDataset);
  const finalOutput : LOAD_POP_ANALYZER = {
    fullSet : initDataset,
    crossFilterSet : proccessedMembers.crossfilterSet,
    membersSelected : proccessedMembers.membersSelected,
    prosDimension : proccessedMembers.prosDimension,
    erDimension : proccessedMembers.erDimension,
    ipDimension : proccessedMembers.ipDimension,
    edCasesDimension : proccessedMembers.edCasesDimension,
    admitsDimension : proccessedMembers.admitsDimension
  } 
  yield put({ type: 'LOAD_POP_ANALYZER', payload: finalOutput})
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* processBrushEventSaga() {
  
  const state = yield select(getEntireTree)
  
  const _fullSet = state.populationAnalyzerReducer().get('fullSet')
  const _crossfilterSet = state.populationAnalyzerReducer().get('crossFilterSet')
  const _membersSelected = state.populationAnalyzerReducer().get('membersSelected')
  const _prosDimension = state.populationAnalyzerReducer().get('prosDimension')
  const _erDimension = state.populationAnalyzerReducer().get('erDimension')
  const _ipDimension = state.populationAnalyzerReducer().get('ipDimension')
  const _admitsDimension = state.populationAnalyzerReducer().get('admitsDimension')
  const _edCasesDimension = state.populationAnalyzerReducer().get('edCasesDimension')
  //const _tableSet = generateMemberTable(_fullSet, _membersSelected)

  const finalOutput : BRUSH_UPDATE = {
    fullSet : _fullSet,
    crossFilterSet : _crossfilterSet,
    membersSelected : _membersSelected,
    prosDimension : _prosDimension,
    erDimension : _erDimension,
    ipDimension : _ipDimension, 
    admitsDimension : _admitsDimension,
    edCasesDimension : _edCasesDimension
  } 
  yield put({ type: 'BRUSH_UPDATE', payload: finalOutput})
}

function generateMemberTable(_fullSet:Array<IfullSet>, _membersSelected:any):any{

    const fS = _fullSet;
    const keys = _membersSelected.group().all()

    const convertToMoney = (d:any) => {return '$' + d.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}

    alasql.fn['convertToMoney'] = convertToMoney; 

    return ( alasql(`SELECT 
                            fS.member_key
                            ,fS.age
                            ,fS.mm_count
                            ,convertToMoney(fS.amt_paid) amt_paid
                            ,convertToMoney(fS.amt_allowed) amt_allowed
                            ,fS.cchg
                            ,fS.qty_pcp_visits
                            ,fS.qty_spec_visits
                            ,fS.qty_ed_admits
                            ,fS.qty_admits
                            ,fS.cur_pros_risk_score
                            ,fS.prev_pros_risk_score
                            ,fS.cur_pro_op
                            ,fS.cur_pro_ip
                            from ? fS 
                            join ? keys 
                              on CAST(fS.member_key AS NUMBER) = keys.key 
                            where keys.value = 1`,[fS,keys])
          )


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
  prosDimension : any; 
  erDimension : any; 
  ipDimension : any; 
  admitsDimension : any;
  edCasesDimension : any; 
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
      let _prosDimension = _crossfilterSet.dimension(function(d){ return [+d.prev_pros_risk_score, +d.cur_pros_risk_score]});
      // dimension for er bar chart
      let _erDimension = _crossfilterSet.dimension(function(d){ return d.cur_pro_op});
      // dimension for ip bar chart
      let _ipDimension = _crossfilterSet.dimension(function(d){ return d.cur_pro_ip});
      // dimension for admits breakdown bar chart 
      let _admitsDimension = _crossfilterSet.dimension(function(d){ return d.qty_admits})
      // dimension for admits breakdown bar chart 
      let _edCasesDimension = _crossfilterSet.dimension(function(d){ return d.qty_ed_admits})

      let _membersSelected = _crossfilterSet.dimension(function(d){return d.member_key})

      return {
        crossfilterSet : _crossfilterSet,
        membersSelected : _membersSelected,
        prosDimension : _prosDimension,
        erDimension : _erDimension,
        ipDimension : _ipDimension,
        admitsDimension : _admitsDimension,
        edCasesDimension : _edCasesDimension
      }

      //generateMemberTable();
}
