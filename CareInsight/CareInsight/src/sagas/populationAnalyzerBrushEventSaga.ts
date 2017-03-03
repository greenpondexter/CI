import {call, fork, put, take, takeLatest, takeEvery, select} from 'redux-saga/effects' 
import * as crossfilter from 'crossfilter';
import {List, Map, Set, fromJS} from 'immutable'
import * as alasql from 'alasql';
import * as _ from 'lodash';
import {LOAD_POP_ANALYZER, BRUSH_UPDATE} from '../actions/actionsInterface'
import store from '../components/Entry'
import {getEntireTree} from '../reducers/selectors'
import {generateMemberTable, IfullSet} from './populationAnalyzerCommon'

export default function* handleBrushEvent():any{
  yield takeEvery('TRIGGER_BRUSH_UPDATE', processBrushEventSaga)
}

function* processBrushEventSaga() {
  
  const state = yield select(getEntireTree)
  
  const _fullSet : Array<IfullSet> = state.populationAnalyzerReducer().get('fullSet')
  const _crossfilterSet = state.populationAnalyzerReducer().get('crossFilterSet')
  const _membersSelected = state.populationAnalyzerReducer().get('membersSelected')
  const _prosDimension = state.populationAnalyzerReducer().get('prosDimension')
  const _erDimension = state.populationAnalyzerReducer().get('erDimension')
  const _ipDimension = state.populationAnalyzerReducer().get('ipDimension')
  const _admitsDimension = state.populationAnalyzerReducer().get('admitsDimension')
  const _edCasesDimension = state.populationAnalyzerReducer().get('edCasesDimension')
  const _tableSet = generateMemberTable(_fullSet, _membersSelected)

  const finalOutput : BRUSH_UPDATE = {
    fullSet : _fullSet,
    crossFilterSet : _crossfilterSet,
    membersSelected : _membersSelected,
    prosDimension : _prosDimension,
    erDimension : _erDimension,
    ipDimension : _ipDimension, 
    admitsDimension : _admitsDimension,
    edCasesDimension : _edCasesDimension,
    tableSet : _tableSet
  } 
  yield put({ type: 'BRUSH_UPDATE', payload: finalOutput})
}