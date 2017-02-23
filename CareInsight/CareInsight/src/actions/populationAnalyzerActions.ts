import {Action, LOAD_POP_ANALYZER } from './actionsInterface' 

export function loadPopAnalyzer(): Action<LOAD_POP_ANALYZER>{
    return {
        type: 'LOAD_POP_ANALYZER',
        payload: {
            a : 1
        } 
    }
}