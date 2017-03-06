import {Record, Map} from 'immutable';
import {LOAD_POP_ANALYZER, BRUSH_UPDATE, Action} from '../actions/actionsInterface';
import {switchPage} from '../actions/sessionActions';


const initState = Record({
    fullSet: null,
    crossfilterSet: null, 
    membersSelected : null, 
    erDimension: null,
    prosDimension: null,
    admitsDimension: null,
    edCasesDimension: null,
    cchgDimension : null,
    ageDimension: null,
    payerTypeDimension: null,
    totalPopulationStats : {
        member_count: null,
        pmpm: null,
        min: null, 
        median: null,
        max: null
    }

})

export function populationAnalyzerReducer( state = initState, action: Action<LOAD_POP_ANALYZER>){
    switch(action.type){
        case 'LOAD_POP_ANALYZER':
            return Record({'fullSet' : action.payload.fullSet,
                           'crossFilterSet' : action.payload.crossFilterSet,
                           'membersSelected' : action.payload.membersSelected,
                           'prosDimension'  : action.payload.prosDimension,
                           'erDimension' : action.payload.erDimension,
                           'ipDimension' : action.payload.ipDimension,
                           'admitsDimension' : action.payload.admitsDimension,
                           'edCasesDimension' : action.payload.edCasesDimension,
                           'cchgDimension' : action.payload.cchgDimension,
                           'payerTypeDimension' : action.payload.payerTypeDimension,
                           'ageDimension' : action.payload.ageDimension,
                           'tableSet' : action.payload.tableSet,
                           'totalPopulationStats' : action.payload.totalPopulationStats
                         })
        default:
            return state; 
    }
}

export function populationAnalyzerOnBrushReducer( state = initState, action: Action<BRUSH_UPDATE>){
    switch(action.type){
        case 'BRUSH_UPDATE':
            return Record({'fullSet' : action.payload.fullSet,
                           'crossFilterSet' : action.payload.crossFilterSet,
                           'membersSelected' : action.payload.membersSelected,
                           'prosDimension'  : action.payload.prosDimension,
                           'erDimension' : action.payload.erDimension,
                           'ipDimension' : action.payload.ipDimension, 
                           'admitsDimension' : action.payload.admitsDimension,
                           'edCasesDimension' : action.payload.edCasesDimension,
                           'cchgDimension' : action.payload.cchgDimension,
                           'payerTypeDimension' : action.payload.payerTypeDimension,
                           'ageDimension' : action.payload.ageDimension,
                           'tableSet': action.payload.tableSet,
                           'totalPopulationStats' : action.payload.totalPopulationStats
                         })
        default:
            return state; 
    }
}