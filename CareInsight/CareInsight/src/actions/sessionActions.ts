import {Action, SWITCH_PAGE} from './actionsInterface' 

export function switchPage(payload: SWITCH_PAGE): Action<SWITCH_PAGE>{
    return {
        type: 'SWITCH_PAGE',
        payload: {
            page: payload.page,
            memberKey: payload.memberKey 
        } 
    }
}