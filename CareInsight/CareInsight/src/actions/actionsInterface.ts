export interface Action<T>{
    type: string;
    payload: T; 

}

export type SWITCH_PAGE = {id: number, page: string} 

export type LOAD_POP_ANALYZER = {
     fullSet: Array<any>,
     crossFilterSet: any, 
     membersSelected : any,
     erDimension: any,
     prosDimension: any,
     ipDimension: any
     admitsDimension: any,
     edCasesDimension: any,
     tableSet: any,
     totalPopulationStats: any 
}
export type TRIGGER_POP_ANALYZER_LOAD = {
    count: number 
}

export type TRIGGER_BRUSH_UPDATE = {
    count: number 
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
     tableSet: any,
     totalPopulationStats: any 
}

type populationStats = {
    member_count: number,
    pmpm : number, 
    min: number, 
    median: number,
    max: number 
}