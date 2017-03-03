import * as alasql from 'alasql';


export interface IfullSet {
  member_key : number,  
  prev_pros_risk_score : number;
  cur_pros_risk_score : number;
  cur_pro_op : number;
  cur_pro_ip : number,
  qty_admits : number,
  qty_ed_admits : number,
  mm_count : number,
  amt_paid: number 
  
}

export function generateMemberTable(_fullSet:Array<IfullSet>, _membersSelected:any):any{

    const fS = _fullSet;
    const keys = _membersSelected.group().all()

    const convertToMoney = (d:any) => {return '$' + d.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}

    alasql.fn['convertToMoney'] = convertToMoney; 

    return ( alasql(`SELECT 
                            fS.member_key
                            ,fS.age
                            ,fS.mm_count
                            ,convertToMoney(fS.amt_paid) amt_paid
                            ,convertToMoney(fS.amt_allowed) amt_allowed
                            ,fS.cchg
                            ,fS.qty_pcp_visits
                            ,fS.qty_spec_visits
                            ,fS.qty_ed_admits
                            ,fS.qty_admits
                            ,fS.cur_pros_risk_score
                            ,fS.prev_pros_risk_score
                            ,fS.cur_pro_op
                            ,fS.cur_pro_ip
                            from ? fS 
                            join ? keys 
                              on CAST(fS.member_key AS NUMBER) = keys.key 
                            where keys.value = 1`,[fS,keys])
          )


}
