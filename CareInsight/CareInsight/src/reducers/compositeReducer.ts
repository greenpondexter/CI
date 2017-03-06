import {combineReducers } from 'redux'
import {switchPageReducer} from './sessionReducer'
import {populationAnalyzerReducer} from './populationAnalyzerReducer'
import {populationAnalyzerUpdateFilterReducer} from './populationAnalyzerFilters'
import {memberProfileReducer} from './memberProfileReducer'

const compositeReducer = combineReducers({
    switchPageReducer,
    populationAnalyzerReducer,
    populationAnalyzerUpdateFilterReducer,
    memberProfileReducer
})

export default compositeReducer