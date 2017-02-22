import {Record, Map} from 'immutable';
import {SWITCH_PAGE, Action} from '../actions/actionsInterface';
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

export function populationAnalyzerReducer( state = initState, action: Action<SWITCH_PAGE>){
    switch(action.type){
        case 'SWITCH_PAGE':
            return Record({'page' : action.payload.page})
        default:
            return state; 
    }
}
