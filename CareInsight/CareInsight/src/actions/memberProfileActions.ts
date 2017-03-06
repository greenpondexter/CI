import {Action,
        TRIGGER_MEMBER_PROFILE_LOAD,
        MEMBER_PROFILE_LOAD} from './actionsInterface'

export function triggerMemberSwitch(data:TRIGGER_MEMBER_PROFILE_LOAD) : Action<TRIGGER_MEMBER_PROFILE_LOAD>{
    return{
        type: 'TRIGGER_MEMBER_PROFILE_LOAD',
        payload: {
            memberKey : data.memberKey 
        }
    }
}

export function loadMemberProfile(data:MEMBER_PROFILE_LOAD) : Action<MEMBER_PROFILE_LOAD>{
    return{
        type: 'MEMBER_PROFILE_LOAD',
        payload: {
            claimsData : data.claimsData ,
            enrData : data.enrData,
            summaryData: data.summaryData,
            dateRange: data.dateRange,
            enrAndClaimsData : data.enrAndClaimsData
        }
    }
}