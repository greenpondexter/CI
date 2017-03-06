import * as alasql from 'alasql';
import * as d3 from 'd3';


export interface IfullSet {
  member_key : number,  
  prev_pros_risk_score : number;
  cur_pros_risk_score : number;
  cur_pro_op : number;
  cur_pro_ip : number,
  qty_admits : number,
  qty_ed_admits : number,
  mm_count : number,
  amt_paid: number,
  cchg: number,
  age: number,
  payerType: number
  
}

export function getTotalPopulationStats(_fullSet:Array<IfullSet>){

     const data = alasql(`SELECT 
                            SUM(result.amt_paid)/SUM(result.mm_count) AS PMPM
                            ,MIN(result.cur_pros_risk_score) AS MIN_SCORE
                            ,AVG(result.cur_pros_risk_score) AS MEDIAN_SCORE
                            ,MAX(result.cur_pros_risk_score) AS MAX_SCORE
                            from ? result `,[_fullSet])
    return { 
        member_count : d3.format(",.0f")(_fullSet.length),
        pmpm : d3.format("$,.0f")(data[0]['PMPM']),
        min : d3.format(",.0f")(data[0]['MIN_SCORE']),
        median : d3.format(",.0f")(data[0]['MEDIAN_SCORE']),
        max : d3.format(",.0f")(data[0]['MAX_SCORE'])
    }
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
