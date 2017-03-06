import {fork} from 'redux-saga/effects'
import initializeProfileStore from './initializePopulationAnalyzerSaga'
import handleBrushEvent from './populationAnalyzerBrushEventSaga'
import handlePopAnalyzerFilterUpdate from './populationAnalyzerFilterSaga' 
import {initializeMemberProfileSaga, refreshMemberProfileSaga} from './initializeMemberProfileSaga'

export function* rootSaga(): any{
   yield [
    fork(initializeProfileStore as any),
    fork(handleBrushEvent as any),
    fork(handlePopAnalyzerFilterUpdate as any),
    fork(initializeMemberProfileSaga as any),
    fork(refreshMemberProfileSaga as any)
  ] 
}