import {combineReducers } from 'redux'
import {switchPageReducer} from './sessionReducer'
import {populationAnalyzerReducer} from './populationAnalyzerReducer'
import {populationAnalyzerUpdateFilterReducer} from './populationAnalyzerFilters'

const compositeReducer = combineReducers({
    switchPageReducer,
    populationAnalyzerReducer,
    populationAnalyzerUpdateFilterReducer
})

export default compositeReducer