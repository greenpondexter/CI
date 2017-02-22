import {Action, SWITCH_PAGE} from './actionsInterface' 

export function switchPage(page: string): Action<SWITCH_PAGE>{
    return {
        type: 'SWITCH_PAGE',
        payload: {
            id  : 1,
            page 
        } 
    }
}