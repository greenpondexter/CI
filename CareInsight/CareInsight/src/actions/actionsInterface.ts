export interface Action<T>{
    type: string;
    payload: T; 

}

export type SWITCH_PAGE = {
    page: string,
    memberKey: number 
} 

export type LOAD_POP_ANALYZER = {
     fullSet: Array<any>,
     crossFilterSet: any, 
     membersSelected : any,
     erDimension: any,
     prosDimension: any,
     ipDimension: any
     admitsDimension: any,
     edCasesDimension: any,
     cchgDimension : any,
     ageDimension: any,
     payerTypeDimension: any,
     allowedDimension : any, 
     tableSet: any,
     totalPopulationStats: any, 
}
export type TRIGGER_POP_ANALYZER_LOAD = {
    count: number 
}

export type TRIGGER_BRUSH_UPDATE = {
    count: number 
}

export type POP_ANALYZER_FILTERS = {
    filters: any 
}

export type BRUSH_UPDATE = {
     fullSet: Array<any>,
     crossFilterSet: any, 
     membersSelected : any,
     erDimension: any,
     prosDimension: any,
     ipDimension: any
     admitsDimension: any,
     edCasesDimension: any,
     cchgDimension : any,
     ageDimension: any,
     payerTypeDimension: any,
     allowedDimension: any, 
     tableSet: any,
     totalPopulationStats: any
}

export type TRIGGER_POP_ANALYZER_FILTER = {
    filter: string,
    val: any 
}

type populationStats = {
    member_count: number,
    pmpm : number, 
    min: number, 
    median: number,
    max: number 
}

export type TRIGGER_MEMBER_PROFILE_LOAD = {
    memberKey: number
}

export type SUMMARY_DATA = {
    member_name : string,
    allowed : any,
    paid : any,
    admits : number,
    mm: number,
    pmpm : any,
    age : number, 
    gender : string,
    member_id : any,
    member_key : any 
}

export type MEMBER_PROFILE_LOAD = {
    claimsData : any,
    enrData : any,
    summaryData: SUMMARY_DATA,
    dateRange: any,
    enrAndClaimsData : ENR_AND_CLAIMS_DATA
}

export type MEMBER_PROFILE_REFRESH = MEMBER_PROFILE_LOAD

export type ENR_AND_CLAIMS_DATA = {
    minMaxDate: Array<any>,
    minMaxRiskScores: Array<number>,
    maxPaid: Array<number>,
    enrData : Array<any>,
    claimsData: Array<any>,
    servicesMonthSummary: any,
    servicesMonthMaxMin: Array<any>
}

export type TRIGGER_MEMBER_PROFILE_BRUSH_UPDATE = {
    dates : Array<any>
}

