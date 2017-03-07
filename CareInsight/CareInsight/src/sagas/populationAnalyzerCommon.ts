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
  amt_allowed: number,
  cchg: number,
  age: number,
  payerType: number
  
}

export function stringifyDate(x:any){
    return x.toISOString().slice(0,10).replace(/-/g,'')  
  }

export function formDate(x:any){
      return new Date(x.substring(0,4), x.substring(4,6), x.substring(6));
  }

export function registerCustomAlaSqlFunctions(){
    alasql.fn['formDate'] = (x:any) => {return typeof x !== "undefined" ? new Date(x.substring(0,4), x.substring(4,6), x.substring(6)) : "29991231"}
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
    const convertToPercent = (d:any) => {return d.toString() + "%"}

    alasql.fn['convertToMoney'] = convertToMoney; 
    alasql.fn['convertToPercent'] = convertToPercent;

    const result = alasql(`SELECT 
                            fS.member_key
                            ,fS.attrib_pcp
                            ,fS.age
                            ,fS.last_visit
                            ,fS.cchg
                            ,fS.cur_pros_risk_score
                            ,fS.prev_pros_risk_score
                            ,fS.cur_pro_op
                            ,fS.cur_pro_ip
                            ,convertToPercent(fS.ip_prob) as ip_prob
                            ,convertToPercent(fS.ed_prob) as ed_prob 
                            ,fS.risk_strata
                            ,convertToMoney(fS.proj_tot_cost) as proj_tot_cost 
                            ,convertToMoney(fS.proj_rx_cost) as proj_rx_cost 
                            from ? fS 
                            join ? keys 
                              on CAST(fS.member_key AS NUMBER) = keys.key 
                            where keys.value = 1
                            `,[fS,keys])
    return result; 


}
