import {Record, Map} from 'immutable';
import {LOAD_POP_ANALYZER, Action} from '../actions/actionsInterface';
import {switchPage} from '../actions/sessionActions';


const initState = Record({
    fullSet: null,
    crossfilterSet: null, 
    membersSelected : null, 
    erDimension: null,
    prosDimension: null,
    admitsDimension: null,
    edCasesDimension: null

})

export function populationAnalyzerReducer( state = initState, action: Action<LOAD_POP_ANALYZER>){
    switch(action.type){
        case 'LOAD_POP_ANALYZER':
            return Record({'fullSet' : action.payload.fullSet,
                           'crossFilterSet' : action.payload.crossFilterSet,
                           'membersSelected' : action.payload.membersSelected,
                           'prosDimension'  : action.payload.prosDimension 
                         })
        default:
            return state; 
    }
}
