export default function ajaxRequest(_page: string, _memberKey?:number):any{
        
        return () => {
          
          return new Promise(function(resolve,reject){
           
            const oReq = new XMLHttpRequest();
            const page = _page === "POP_ANALYZER" ? 
                                    document.getElementById("CareInsightApp").getAttribute("data") + "PopulationAnalyzer/TestPopulationAnalyzerData.json" :
                                    document.getElementById("CareInsightApp").getAttribute("data") +  `/MemberProfile/MemberProfilePage_${_memberKey}.json`
                                                    

            oReq.open("GET", page);

            oReq.onload = () => {
              oReq.status === 200 ? 
                                     _page === "POP_ANALYZER" ? resolve(JSON.parse(oReq.response).data) 
                                                              : resolve({claims: JSON.parse(oReq.response).claims,
                                                                         enr: JSON.parse(oReq.response).enrollment})
                                  : reject(new Error(oReq.statusText));
            };
      
            oReq.onerror = () => {
              reject(new Error("Network error"));
            };

            oReq.send();

        }
       )
      }
}



