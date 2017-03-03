import {fork} from 'redux-saga/effects'
import initializeProfileStore from './initializePopulationAnalyzerSaga'
import handleBrushEvent from './populationAnalyzerBrushEventSaga'

export function* rootSaga(): any{
   yield [
    fork(initializeProfileStore as any),
    fork(handleBrushEvent as any)
  ] 
}