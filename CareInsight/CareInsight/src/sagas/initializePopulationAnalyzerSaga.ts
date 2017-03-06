import {call, fork, put, take, takeLatest, takeEvery, select} from 'redux-saga/effects' 
import * as crossfilter from 'crossfilter';
import {List, Map, Set, fromJS} from 'immutable'
import * as alasql from 'alasql';
import * as _ from 'lodash';
import {LOAD_POP_ANALYZER, BRUSH_UPDATE} from '../actions/actionsInterface'
import store from '../components/Entry'
import {getEntireTree} from '../reducers/selectors'
import {IfullSet, getTotalPopulationStats, generateMemberTable} from './populationAnalyzerCommon'
import ajaxRequest from '../ajax/ajax'


export default function* initializeProfileStore():any{
  yield takeEvery('TRIGGER_POP_ANALYZER_LOAD', loadPopAnalyzerSaga)
}

function* loadPopAnalyzerSaga() {
  const initDataset = yield call(ajaxRequest());
  const proccessedMembers: ProcessMemberSet = processMemberData(initDataset);
  
  const _tableSet = generateMemberTable(initDataset, proccessedMembers.membersSelected)
  const _totalPopulationStats = getTotalPopulationStats(initDataset)

  const finalOutput : LOAD_POP_ANALYZER = {
    fullSet : initDataset,
    crossFilterSet : proccessedMembers.crossfilterSet,
    membersSelected : proccessedMembers.membersSelected,
    prosDimension : proccessedMembers.prosDimension,
    erDimension : proccessedMembers.erDimension,
    ipDimension : proccessedMembers.ipDimension,
    edCasesDimension : proccessedMembers.edCasesDimension,
    admitsDimension : proccessedMembers.admitsDimension,
    cchgDimension : proccessedMembers.cchgDimension,
    ageDimension : proccessedMembers.ageDimension,
    payerTypeDimension: proccessedMembers.payerTypeDimension,
    tableSet : _tableSet,
    totalPopulationStats : _totalPopulationStats

  } 
  yield put({ type: 'LOAD_POP_ANALYZER', payload: finalOutput})
}

interface ProcessMemberSet {
  crossfilterSet : any;
  membersSelected : any;
  prosDimension : any; 
  erDimension : any; 
  ipDimension : any; 
  admitsDimension : any;
  edCasesDimension : any; 
  cchgDimension: any; 
  ageDimension: any;
  payerTypeDimension : any; 
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
                amt_paid: d.amt_paid,
                age: d.age,
                cchg: d.cchg,
                payerType: d.payerType
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

      let _cchgDimension = _crossfilterSet.dimension(function(d){ return d.cchg})

      let _ageDimension = _crossfilterSet.dimension(function(d){ return d.age})

      let _payerTypeDimension = _crossfilterSet.dimension(function(d){ return d.payerType})

      let _membersSelected = _crossfilterSet.dimension(function(d){return d.member_key})


      return {
        crossfilterSet : _crossfilterSet,
        membersSelected : _membersSelected,
        prosDimension : _prosDimension,
        erDimension : _erDimension,
        ipDimension : _ipDimension,
        admitsDimension : _admitsDimension,
        edCasesDimension : _edCasesDimension,
        cchgDimension : _cchgDimension,
        ageDimension : _ageDimension,
        payerTypeDimension : _payerTypeDimension
      }

}
