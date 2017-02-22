import {Record, Map} from 'immutable';
import {SWITCH_PAGE, Action} from '../actions/actionsInterface'
import {switchPage} from '../actions/sessionActions';


const initState = Record({
    page: "POPULATION_ANALYZER"
})

export function switchPageReducer( state = initState, action: Action<SWITCH_PAGE>){
    switch(action.type){
        case 'SWITCH_PAGE':
            return Record({'page' : action.payload.page})
        default:
            return state; 
    }
}
