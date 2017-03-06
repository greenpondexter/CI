import {combineReducers } from 'redux'
import {switchPageReducer} from './sessionReducer'
import {populationAnalyzerReducer, populationAnalyzerOnBrushReducer} from './populationAnalyzerReducer'
import {populationAnalyzerUpdateFilterReducer} from './populationAnalyzerFilters'

const compositeReducer = combineReducers({
    switchPageReducer,
    populationAnalyzerReducer,
    populationAnalyzerOnBrushReducer,
    populationAnalyzerUpdateFilterReducer
})

export default compositeReducer