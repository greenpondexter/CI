import {call, fork, put, take, takeLatest, takeEvery, select} from 'redux-saga/effects' 
import * as crossfilter from 'crossfilter';
import {List, Map, Set, fromJS} from 'immutable'
import * as alasql from 'alasql';
import * as _ from 'lodash';
import {TRIGGER_POP_ANALYZER_FILTER, POP_ANALYZER_FILTERS} from '../actions/actionsInterface'
import store from '../components/Entry'
import {getFilters, getEntireTree} from '../reducers/selectors'


export default function* handlePopAnalyzerFilterEvent():any{
  yield takeEvery('TRIGGER_POP_ANALYZER_FILTER', processFilterSaga)
}

function* processFilterSaga(data:any) {
  
  const _filterState = yield select(getFilters)
  const _dimState = yield select(getEntireTree)

  var _filters = _filterState
                 .populationAnalyzerUpdateFilterReducer()
                 .get('filters');

  var _dims = _dimState.
              populationAnalyzerReducer()

  if(data.payload.filter == 'CCHG')
    {
      _filters.cchgFilter.selected = data.payload.val.target.selectedOptions[0].label;     
      _filters.cchgFilter.selected === "All" ? _dims.get('cchgDimension').filter(null)
                                        : _dims.get('cchgDimension').filter(_filters.cchgFilter.selected)
    }
  else if(data.payload.filter == 'Payer'){
      _filters.payerTypeFilter.selected = data.payload.val.target.selectedOptions[0].label;     
      _filters.payerTypeFilter.selected === "All" ? _dims.get('payerTypeDimension').filter(null)
                                        : _dims.get('payerTypeDimension').filter(_filters.payerTypeFilter.selected)
    }

  const finalOutput : POP_ANALYZER_FILTERS = {
    filters : _filters
  }

  yield put({ type: 'POP_ANALYZER_FILTERS', payload: finalOutput})
}