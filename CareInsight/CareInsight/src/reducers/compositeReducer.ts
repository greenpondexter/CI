import {combineReducers } from 'redux'
import {switchPageReducer} from './sessionReducer'
import {populationAnalyzerReducer} from './populationAnalyzerReducer'

const compositeReducer = combineReducers({
    switchPageReducer,
    populationAnalyzerReducer
})

export default compositeReducer