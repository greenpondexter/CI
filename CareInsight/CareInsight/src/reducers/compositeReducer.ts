import {combineReducers } from 'redux'
import {switchPageReducer} from './sessionReducer'
import {populationAnalyzerReducer, populationAnalyzerOnBrushReducer} from './populationAnalyzerReducer'

const compositeReducer = combineReducers({
    switchPageReducer,
    populationAnalyzerReducer,
    populationAnalyzerOnBrushReducer
})

export default compositeReducer