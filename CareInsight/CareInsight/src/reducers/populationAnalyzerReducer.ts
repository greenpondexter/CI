import {Record, Map} from 'immutable';
import {SWITCH_PAGE, LOAD_POP_ANALYZER, Action} from '../actions/actionsInterface';
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
        case 'SWITCH_PAGE':
            return Record({'a' : action.payload.a})
        default:
            return state; 
    }
}
