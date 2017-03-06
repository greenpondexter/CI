import {call, fork, put, take, takeLatest, takeEvery, select} from 'redux-saga/effects' 
import * as crossfilter from 'crossfilter';
import {List, Map, Set, fromJS} from 'immutable'
import * as alasql from 'alasql';
import * as _ from 'lodash';
import * as d3 from 'd3'
import {LOAD_POP_ANALYZER, BRUSH_UPDATE} from '../actions/actionsInterface'
import store from '../components/Entry'
import {getEntireTree, getMemberProfile} from '../reducers/selectors'
import {IfullSet, 
        registerCustomAlaSqlFunctions,
        getTotalPopulationStats, 
        generateMemberTable,
        stringifyDate} from './populationAnalyzerCommon'
import ajaxRequest from '../ajax/ajax'
import {SUMMARY_DATA} from '../actions/actionsInterface'


export default function* initializeMemberProfileSaga():any{
  yield takeEvery('TRIGGER_MEMBER_PROFILE_LOAD', loadMemberProfileSaga)
}

function* loadMemberProfileSaga(data:any) {
  const initDataset = yield call(ajaxRequest('MEMBER_PROFILE', data.payload.memberKey));
  registerCustomAlaSqlFunctions();
  const finalOutput = yield populateMemberProfileComponents(initDataset);
  
  yield put({ type: 'MEMBER_PROFILE_LOAD', payload: finalOutput})
}


function* populateMemberProfileComponents(dataSet:any){
    let _state = ((yield select(getMemberProfile)) as any).toJS();

    const _claimsData = dataSet.claims;
    const _enrData = dataSet.enr; 

    //get min and max dates so we know how to constrain queries based on time slider
    const _dateRange = getMinMaxDate(_state.dateRange, _enrData);

    const _summaryData: SUMMARY_DATA = generateSummaryTable(_dateRange, _claimsData, _enrData)

    return {
        claimsData : _claimsData,
        enrData : _enrData,
        summaryData : _summaryData,
        dateRange : _dateRange
    }

}

function generateSummaryTable(dates: any, claimsData: any, enrData: any): SUMMARY_DATA{

      //gather claims and enrollment data from alasql 
      const claims  = alasql(`SELECT member_name, SUM(admits) admits, SUM(amt_allowed) allowed, 
                         SUM(amt_paid) paid  
                         FROM ?  
                         where from_date > ${stringifyDate(dates[0])} and from_date < ${stringifyDate(dates[1])}
                         GROUP BY member_name`, [claimsData]);

      const mm = alasql(`SELECT SUM(mm_units) mm from ? where from_date > ${stringifyDate(dates[0])} and from_date < ${stringifyDate(dates[1])}`, [enrData] )
      const memberInfo = alasql(`SELECT DISTINCT member_name, age, gender, member_key, member_id from ? `, [enrData] )


      //destructure results 
      const {member_name: _member_name, 
              allowed: _allowed, 
              admits: _admits,
              paid: _paid
             } = claims[0]

      const {mm: _mm} = mm[0]

      const {age: _age,
              gender: _gender,
              member_id: _member_id,
              member_key: _member_key
              } = memberInfo[0]

      const _pmpm = _paid/_mm; 

      //poupulate state with what you are sending to component 
      return {
           member_name: _member_name,
           allowed: d3.format("$,.0f")(_allowed),
           paid: d3.format("$,.0f")(_paid), 
           admits: _admits,
           mm: _mm, 
           pmpm: d3.format("$,.0f")(_pmpm),
           age: _age, 
           gender: _gender,
           member_id: _member_id,
           member_key: _member_key
        };
}


function getMinMaxDate(dateRange: any, enrData: any){

      if(dateRange.length == 0){   
      
            //get an ordered array of distinct dates and grab the 25th and 75th percentile date 
            const data = alasql (`select distinct data.from_date from ? data ORDER BY data.from_date ASC`, [enrData])
            const percIndeces = [data[Math.floor(((data.length)*.25))]['from_date'], 
                                 data[Math.ceil(((data.length)*.75))]['from_date']]
            
            return [new Date(percIndeces[0].toString().substring(0,4), percIndeces[0].toString().substring(4,6), percIndeces[0].toString().substring(6)),
                   new Date(percIndeces[1].toString().substring(0,4), percIndeces[1].toString().substring(4,6), percIndeces[1].toString().substring(6))]
      }
       else{

          return this.dateRange;  
       }         
      
  }