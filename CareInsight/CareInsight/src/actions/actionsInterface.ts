export interface Action<T>{
    type: string;
    payload: T; 

}

export type SWITCH_PAGE = {id: number, page: string} 
export type LOAD_POP_ANALYZER = {
     fullSet: Array<any>,
     crossFilterSet: any, 
     membersSelected : any,
    // erDimension: any,
     prosDimension: any
    // admitsDimension: any,
    // edCasesDimension: any 
    //a : any 
}
export type TRIGGER_POP_ANALYZER_LOAD = {
    count: number 
}