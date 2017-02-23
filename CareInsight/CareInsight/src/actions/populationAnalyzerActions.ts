import {Action, LOAD_POP_ANALYZER, TRIGGER_POP_ANALYZER_LOAD } from './actionsInterface' 

export function loadPopAnalyzer(data:LOAD_POP_ANALYZER): Action<LOAD_POP_ANALYZER>{
    return {
        type: 'LOAD_POP_ANALYZER',
        payload: {
            fullSet : data.fullSet, 
            crossFilterSet : data.crossFilterSet, 
            membersSelected : data.membersSelected 
        } 
    }
}

export function triggerPopAnalyzer(): Action<TRIGGER_POP_ANALYZER_LOAD>{
    return {
        type: 'TRIGGER_POP_ANALYZER_LOAD',
        payload: {
            count : 1
        } 
    }
}