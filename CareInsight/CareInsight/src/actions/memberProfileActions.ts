import {Action,
        TRIGGER_MEMBER_PROFILE_LOAD,
        MEMBER_PROFILE_LOAD,
        MEMBER_PROFILE_REFRESH,
        TRIGGER_MEMBER_PROFILE_BRUSH_UPDATE} from './actionsInterface'

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


export function triggerMemberProfileBrushUpdate(data:TRIGGER_MEMBER_PROFILE_BRUSH_UPDATE) : Action<TRIGGER_MEMBER_PROFILE_BRUSH_UPDATE>{
    return{
        type: 'TRIGGER_MEMBER_PROFILE_BRUSH_UPDATE',
        payload: {
            dates : data.dates 
        }
    }
}

export function memberProfileRefresh(data:MEMBER_PROFILE_REFRESH) : Action<MEMBER_PROFILE_REFRESH>{
    return{
        type: 'MEMBER_PROFILE_REFRESH',
        payload: {
            claimsData : data.claimsData ,
            enrData : data.enrData,
            summaryData: data.summaryData,
            dateRange: data.dateRange,
            enrAndClaimsData : data.enrAndClaimsData
        }
    }
}