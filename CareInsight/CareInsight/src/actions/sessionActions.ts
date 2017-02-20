export interface Action<T>{
    type: string;
    payload: T; 

}

export type SWITCH_PAGE = {id: number, page: string} 

export function switchPage(page: string): Action<SWITCH_PAGE>{
    return {
        type: 'SWITCH_PAGE',
        payload: {
            id  : 1,
            page 
        } 
    }
}