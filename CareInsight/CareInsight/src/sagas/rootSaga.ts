import {fork} from 'redux-saga/effects'
import initializeProfileStore from './initializePopulationAnalyzerSaga'
import handleBrushEvent from './populationAnalyzerBrushEventSaga'
import handlePopAnalyzerFilterUpdate from './populationAnalyzerFilterSaga' 

export function* rootSaga(): any{
   yield [
    fork(initializeProfileStore as any),
    fork(handleBrushEvent as any),
    fork(handlePopAnalyzerFilterUpdate as any)
  ] 
}