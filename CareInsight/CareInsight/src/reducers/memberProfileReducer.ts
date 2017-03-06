import {Record, Map} from 'immutable';
import {MEMBER_PROFILE_LOAD, Action} from '../actions/actionsInterface'
import {switchPage} from '../actions/sessionActions';


const initState = Record({
    claimsData : [],
    enrData : [],
    summaryData : {} ,
    dateRange : [],
    enrAndClaimsData : {}
})

export function memberProfileReducer( state = initState, action: Action<MEMBER_PROFILE_LOAD>){
    switch(action.type){
        case 'MEMBER_PROFILE_LOAD':
            return Record({'claimsData' : action.payload.claimsData,
                            'enrData' : action.payload.enrData,
                            'summaryData' : action.payload.summaryData,
                            'dateRange' : action.payload.dateRange,
                            'enrAndClaimsData' : action.payload.enrAndClaimsData
                         })
        default:
            return state; 
    }
}
