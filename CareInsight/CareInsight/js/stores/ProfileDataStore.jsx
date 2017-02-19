import Alt from '../alt.js';
import $ from 'jquery';
import crossfilter from 'crossfilter'
import MemberProfileActions from '../actions/MemberProfileActions';
import {List, Map, fromJS, toJS} from 'immutable';
import SessionStore from './SessionStore'
import alasql from 'alasql';
import d3 from 'd3';
import _ from 'lodash'

class ProfileStore {
  constructor() {
    this.bindActions(MemberProfileActions)

    this.memberKey = List.of(0)
    this.claimsData = []
    this.enrData = [];
    this.summaryData = Map();
    this.hcgData = {}
    this.drgData = Map()
    this.icdDiagData = Map()
    this.enrAndClaimsData = {}
    this.dateRange = List();

    this.populateAllComponents.bind(this);
    this.generateSummaryTable.bind(this);
    this.generateHCGTable.bind(this);
    this.generateTimeTable.bind(this);
    this.getMinMaxDate.bind(this);
    this.onLoadMemberData.bind(this);
    this.generateDrgTable.bind(this);
    this.generateICDDiagTable.bind(this);
    this.onUpdateDate.bind(this);
    this.stringifyDate.bind(this);
    this.formDate.bind(this);
    this.registerCustomAlaSqlFunctions.bind(this);
    this.generateTestData.bind(this);
    this.generateTestData.bind(this);
    

  }


  generateSummaryTable(){

      //get min and max dates so we know how to constrain queries based on time slider
      const queryDates = this.getMinMaxDate();

      //gather claims and enrollment data from alasql 
      const claims  = alasql(`SELECT member_name, SUM(admits) admits, SUM(amt_allowed) allowed, 
                         SUM(amt_paid) paid  
                         FROM ?  
                         where from_date > ${this.stringifyDate(queryDates.get(0))} and from_date < ${this.stringifyDate(queryDates.get(1))}
                         GROUP BY member_name`, [this.claimsData.toJS()]);

      const mm = alasql(`SELECT SUM(mm_units) mm from ? where from_date > ${this.stringifyDate(queryDates.get(0))} and from_date < ${this.stringifyDate(queryDates.get(1))}`, [this.enrData.toJS()] )
      const memberInfo = alasql(`SELECT DISTINCT member_name, age, gender, member_key, member_id from ? `, [this.enrData.toJS()] )


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
      this.summaryData = Map({
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
        });
  }

  onUpdateDate(dates){
    const _dates = [dates[0], dates[1]]
    this.dateRange = this.dateRange.set('0', dates[0]);
    this.dateRange = this.dateRange.set('1', dates[1]);
    this.populateAllComponents();
    
  }

  generateDrgTable(){
    const queryDates = this.getMinMaxDate();

    if(queryDates.get(0) == queryDates.get(1)) return;

    const drgData = alasql(`SELECT SUM(amt_paid) paid, adm_drg drg from ?  where from_date > ${this.stringifyDate(queryDates.get(0))} and from_date < ${this.stringifyDate(queryDates.get(1))} GROUP BY adm_drg`, [this.claimsData.toJS()]) 
    
    //create an array of drgs 
    let drgList = []
    const drgs = _.forEach(drgData, (x) => {drgList.push(x.drg)})

    //get the min and max paid amount for the drg set
    let minMaxPaid = [_.minBy(drgData, (x) => {return x.paid})['paid'], _.maxBy(drgData, (x) => {return x.paid})['paid']]
    
    //create the crossfilter and dimension instance 
    const cfDRG = crossfilter(drgData);
    const drgDim = cfDRG.dimension((d) => {return d.drg})

    const nf = d3.format(".1f");
    this.drgData = Map({
      data: drgDim.group().reduceSum((d) => {return nf(d.paid)}),
      drgDim: drgDim,
      drgList: drgList, 
      paidMinMax: minMaxPaid
    })

  }

  generateICDDiagTable(){
    const queryDates = this.getMinMaxDate();

    if(queryDates.get(0) == queryDates.get(1)) return;

    const icdDiagData = alasql(`SELECT TOP 10 SUM(amt_paid) paid, icd_diag_code_and_desc icd_diag from ?  where from_date > ${this.stringifyDate(queryDates.get(0))} and from_date < ${this.stringifyDate(queryDates.get(1))} GROUP BY icd_diag_code_and_desc ORDER BY SUM(amt_paid) desc`, [this.claimsData.toJS()]) 
    
    //create an array of drgs 
    let icdDiagList = []
    const icds = _.forEach(icdDiagData, (x) => {icdDiagList.push(x.icd_diag)})

    //get the min and max paid amount for the drg set
    let minMaxPaid = [_.minBy(icdDiagData, (x) => {return x.paid})['paid'], _.maxBy(icdDiagData, (x) => {return x.paid})['paid']]
    
    //create the crossfilter and dimension instance 
    const cficdDiag = crossfilter(icdDiagData);
    const icdDiagDim = cficdDiag.dimension((d) => {return d.icd_diag})

    const nf = d3.format(".1f");
    this.icdDiagData = Map({
      data: icdDiagDim.group().reduceSum((d) => {return nf(d.paid)}),
      icdDiagDim: icdDiagDim,
      icdDiagList: icdDiagList, 
      paidMinMax: minMaxPaid
    })

  }

  generateHCGTable(){

      const queryDates = this.getMinMaxDate();

      //get paid amount by hcg setting 
      const hcgData = alasql(`SELECT SUM(amt_paid) paid, mr_line_desc1 setting from ?  where from_date > ${this.stringifyDate(queryDates.get(0))} and from_date < ${this.stringifyDate(queryDates.get(1))} GROUP BY mr_line_desc1`, [this.claimsData.toJS()])

      //create dimension
      const cfHCG = crossfilter(hcgData);
      const hcgDim = cfHCG.dimension((d) => {return d.setting})

      const nf = d3.format(".1f");
      //populate state with what you are sending to component 
      this.hcgData = Map({ data : hcgDim.group().reduceSum((d) => {return nf(d.paid)}),
                           setting : hcgDim 
                        })

  } 

  getMinMaxDate(){

      if(this.dateRange.isEmpty()){   
      
            //get an ordered array of distinct dates and grab the 25th and 75th percentile date 
            const data = alasql (`select distinct data.from_date from ? data ORDER BY data.from_date ASC`, [this.enrData.toJS()])
            const percIndeces = [data[Math.floor(((data.length)*.25))]['from_date'], 
                                 data[Math.ceil(((data.length)*.75))]['from_date']]
            
            return List().push(new Date(percIndeces[0].toString().substring(0,4), percIndeces[0].toString().substring(4,6), percIndeces[0].toString().substring(6)))
                         .push(new Date(percIndeces[1].toString().substring(0,4), percIndeces[1].toString().substring(4,6), percIndeces[1].toString().substring(6)))
      }
       else{

          return this.dateRange;  
       }         
      
  }

  stringifyDate(x){
    return x.toISOString().slice(0,10).replace(/-/g,'')  
  }

  formDate(x){
      return new Date(x.substring(0,4), x.substring(4,6), x.substring(6));
  }

  registerCustomAlaSqlFunctions(x){
    alasql.fn.formDate = (x) => {return typeof x !== "undefined" ? new Date(x.substring(0,4), x.substring(4,6), x.substring(6)) : "29991231"}
  }

  generateTimeTable(){

      //create date format functions for alasql and d3    
      alasql.fn.formDateMonth = (x) => {return typeof x !== "undefined" ? new Date(x.substring(0,4), x.substring(4,6) ) : "299912"} 

      //get max and min date for claims.  
      const queryDates = this.getMinMaxDate();

      //friendly format js arrays for alasql 
      const enr = this.enrData.toJS();
      const clm = this.claimsData.toJS();
      
      //query for data needed 
      const servicesMonthSummary = alasql (`select COUNT(DISTINCT data.services_key) as services_count, formDateMonth(data.from_date) as date from ? data where data.from_date > ${this.stringifyDate(queryDates.get(0))} and data.from_date < ${this.stringifyDate(queryDates.get(1))} group by formDateMonth(data.from_date) ORDER BY  formDateMonth(data.from_date) `, [this.claimsData.toJS()])
      const enrData = alasql (`select distinct formDate(data.from_date) as date, data.as_total as risk from ? data where data.from_date > ${this.stringifyDate(queryDates.get(0))} and data.from_date < ${this.stringifyDate(queryDates.get(1))}`,[this.enrData.toJS()])
      const claimsData = alasql (`select distinct data.services_key, formDate(data.from_date) as date, data.amt_paid as paid, REPLACE(data.mr_line_desc1,' ','') as setting from ? data where data.amt_paid > -.01 and data.from_date > ${this.stringifyDate(queryDates.get(0))} and data.from_date < ${this.stringifyDate(queryDates.get(1))}`,[this.claimsData.toJS()])
      const minMaxDatesAndRisks = alasql (`select MIN(data.from_date) as min_date, MAX(data.from_date) as max_date, MIN(data.as_total) as min_risk, MAX(data.as_total) as max_risk from ? data`, [this.enrData.toJS()]);
      const maxPaid = alasql(`select max(data.amt_paid) as max_paid from ? data`,[this.claimsData.toJS()]);
  


      //if the slider hasn't been rendered yet, set a default date range 
      if(this.dateRange.isEmpty()) {
        this.dateRange = this.dateRange.push(queryDates.get(0));
        this.dateRange = this.dateRange.push(queryDates.get(1));
      }

      //populate state with what you are sending to component
      this.enrAndClaimsData = fromJS({
        minMaxDate: [this.formDate(minMaxDatesAndRisks[0].min_date.toString()), this.formDate(minMaxDatesAndRisks[0].max_date.toString())],
        minMaxRiskScores : [minMaxDatesAndRisks[0].min_risk, minMaxDatesAndRisks[0].max_risk], 
        maxPaid : [maxPaid[0].max_paid],
        enrData: enrData,
        claimsData: claimsData,
        servicesMonthSummary: servicesMonthSummary,
        servicesMonthMaxMin: [0,2000]
      })
      
      
      
  } 

  populateAllComponents(){
    let self = this; 
    this.registerCustomAlaSqlFunctions();
    
    //create and manipulate Member Profile page components
    self.generateSummaryTable();
    self.generateDrgTable();
    self.generateICDDiagTable();
    self.generateHCGTable();
    self.generateTimeTable();

    this.emitChange();
    
  }

  onLoadMemberData(){

    //grab the member key from seesion store and send the request for member json file
    this.memberKey = this.memberKey.set(0,SessionStore.getState().info.get('member_key'))
    this.generateTestData()
  }

  generateTestData(){
       
        //event listener for json request 
        function responseListener (self, pars) {
          
          const claimsData =  JSON.parse(pars.target.responseText).claims 
          const enrData = JSON.parse(pars.target.responseText).enrollment
          
          //create immutable datastructures 
          self.claimsData = List(claimsData);
          self.enrData = List(enrData)

          //we've gotten data, the populating of components process
          self.populateAllComponents()

        }

        var self = this; 
        
        //create an send XMLHttpRequest
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", responseListener.bind(null, self));
        
        const page =  document.getElementById("CareInsightApp").getAttribute("data") + `/MemberProfile/MemberProfilePage_${this.memberKey.get(0)}.json`
        oReq.open("GET", page);
        oReq.send();
  }

    
}

module.exports = Alt.createStore(ProfileStore, 'ProfileStore');
