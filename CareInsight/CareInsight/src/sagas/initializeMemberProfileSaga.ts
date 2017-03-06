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
        stringifyDate,
        formDate} from './populationAnalyzerCommon'
import ajaxRequest from '../ajax/ajax'
import {SUMMARY_DATA, ENR_AND_CLAIMS_DATA} from '../actions/actionsInterface'


export function* initializeMemberProfileSaga():any{
  yield takeEvery('TRIGGER_MEMBER_PROFILE_LOAD', loadMemberProfileSaga)
}

export function* refreshMemberProfileSaga():any{
    yield takeEvery('TRIGGER_MEMBER_PROFILE_BRUSH_UPDATE', memberProfileBrushUpdateSaga)
}

function* memberProfileBrushUpdateSaga(data:any){
    let _state = ((yield select(getMemberProfile)) as any).toJS()
    const finalOutput = yield populateMemberProfileComponents(_state.claimsData, _state.enrData, data.payload.dates);
  
    yield put({ type: 'MEMBER_PROFILE_REFRESH', payload: finalOutput})
}

function* loadMemberProfileSaga(data:any) {
  const initDataset = yield call(ajaxRequest('MEMBER_PROFILE', data.payload.memberKey));
  registerCustomAlaSqlFunctions();
  const finalOutput = yield populateMemberProfileComponents(initDataset.claims, initDataset.enr);
  
  yield put({ type: 'MEMBER_PROFILE_LOAD', payload:finalOutput})
}


function* populateMemberProfileComponents(_claimsData:any, _enrData:any, dates?: any){
    let _state = ((yield select(getMemberProfile)) as any).toJS();

    //get min and max dates so we know how to constrain queries based on time slider
    const _dateRange = typeof(dates) != 'undefined' ? 
                             dates : 
                             getMinMaxDate(_state.dateRange, _enrData);

    const _summaryData: SUMMARY_DATA = generateSummaryTable(_dateRange, _claimsData, _enrData)
    const _enrAndClaimsData : ENR_AND_CLAIMS_DATA = generateTimeTable(_dateRange, _claimsData, _enrData)

    return {
        claimsData : _claimsData,
        enrData : _enrData,
        summaryData : _summaryData,
        dateRange : _dateRange,
        enrAndClaimsData : _enrAndClaimsData
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

function generateTimeTable(dates: any, _claimsData: any, _enrData: any): ENR_AND_CLAIMS_DATA{
       //create date format functions for alasql and d3    
      alasql.fn.formDateMonth = (x) => {return typeof x !== "undefined" ? new Date(x.substring(0,4), x.substring(4,6) ) : "299912"} 
      
      //query for data needed 
      const servicesMonthSummary = alasql (`select COUNT(DISTINCT data.services_key) as services_count, formDateMonth(data.from_date) as date from ? data where data.from_date > ${stringifyDate(dates[0])} and data.from_date < ${stringifyDate(dates[1])} group by formDateMonth(data.from_date) ORDER BY  formDateMonth(data.from_date) `, [_claimsData])
      const enrData = alasql (`select distinct formDate(data.from_date) as date, data.as_total as risk from ? data where data.from_date > ${stringifyDate(dates[0])} and data.from_date < ${stringifyDate(dates[1])}`,[_enrData])
      const claimsData = alasql (`select distinct data.services_key, formDate(data.from_date) as date, data.amt_paid as paid, REPLACE(data.mr_line_desc1,' ','') as setting from ? data where data.amt_paid > -.01 and data.from_date > ${stringifyDate(dates[0])} and data.from_date < ${stringifyDate(dates[1])}`,[_claimsData])
      const minMaxDatesAndRisks = alasql (`select MIN(data.from_date) as min_date, MAX(data.from_date) as max_date, MIN(data.as_total) as min_risk, MAX(data.as_total) as max_risk from ? data`, [_enrData]);
      const maxPaid = alasql(`select max(data.amt_paid) as max_paid from ? data`,[_claimsData]);
  

      //populate state with what you are sending to component
      return {
        minMaxDate: [formDate(minMaxDatesAndRisks[0].min_date.toString()), formDate(minMaxDatesAndRisks[0].max_date.toString())],
        minMaxRiskScores : [minMaxDatesAndRisks[0].min_risk, minMaxDatesAndRisks[0].max_risk], 
        maxPaid : [maxPaid[0].max_paid],
        enrData: enrData,
        claimsData: claimsData,
        servicesMonthSummary: servicesMonthSummary,
        servicesMonthMaxMin: [0,2000]
      }
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