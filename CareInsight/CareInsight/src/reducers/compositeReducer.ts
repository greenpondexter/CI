import { combineReducers } from 'redux'
import {switchPageReducer} from './sessionReducer'

const compositeReducer = combineReducers({
    switchPageReducer
})

export default compositeReducer