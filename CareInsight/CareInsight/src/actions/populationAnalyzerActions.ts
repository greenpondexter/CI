import {Action, 
        LOAD_POP_ANALYZER, 
        TRIGGER_POP_ANALYZER_LOAD, 
        TRIGGER_BRUSH_UPDATE,
        BRUSH_UPDATE,
        POP_ANALYZER_FILTERS,
        TRIGGER_POP_ANALYZER_FILTER} from './actionsInterface' 

export function loadPopAnalyzer(data:LOAD_POP_ANALYZER): Action<LOAD_POP_ANALYZER>{
    return {
        type: 'LOAD_POP_ANALYZER',
        payload: {
            fullSet : data.fullSet, 
            crossFilterSet : data.crossFilterSet, 
            membersSelected : data.membersSelected,
            prosDimension : data.prosDimension,
            erDimension: data.erDimension,
            ipDimension: data.ipDimension,
            admitsDimension: data.admitsDimension,
            edCasesDimension : data.edCasesDimension,
            cchgDimension : data.cchgDimension,
            ageDimension: data.ageDimension,
            payerTypeDimension: data.payerTypeDimension,
            tableSet : data.tableSet,
            totalPopulationStats : data.totalPopulationStats
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

export function triggerBrushUpdate(): Action<TRIGGER_BRUSH_UPDATE>{
    return {
        type: 'TRIGGER_BRUSH_UPDATE',
        payload: {
            count : 1
        } 
    }
}

export function brushUpdate(data:BRUSH_UPDATE): Action<BRUSH_UPDATE>{
    return {
        type: 'BRUSH_UPDATE',
        payload: {
            fullSet : data.fullSet, 
            crossFilterSet : data.crossFilterSet, 
            membersSelected : data.membersSelected,
            prosDimension : data.prosDimension,
            erDimension : data.erDimension,
            ipDimension : data.ipDimension,
            admitsDimension : data.admitsDimension,
            edCasesDimension : data.edCasesDimension,
            cchgDimension : data.cchgDimension,
            ageDimension: data.ageDimension,
            payerTypeDimension: data.payerTypeDimension,
            tableSet : data.tableSet,
            totalPopulationStats : data.totalPopulationStats
        } 
    }
}

export function triggerPopAnalyzerFilter(data:TRIGGER_POP_ANALYZER_FILTER): Action<TRIGGER_POP_ANALYZER_FILTER>{
    return {
        type: 'TRIGGER_POP_ANALYZER_FILTER',
        payload: {
            filter : data.filter,
            val: data.val 
        }
    }
}


export function popAnalyzerFilterUpdate(data:POP_ANALYZER_FILTERS): Action<POP_ANALYZER_FILTERS>{
    return {
        type: 'POP_ANALYZER_FILTERS',
        payload: {
            filters: data.filters 
        } 
    }
}