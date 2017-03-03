export default function ajaxRequest():any{
        
        return () => {
          
          return new Promise(function(resolve,reject){
           
            const oReq = new XMLHttpRequest();
            const page =  document.getElementById("CareInsightApp").getAttribute("data") + "PopulationAnalyzer/TestPopulationAnalyzerData.json"

            oReq.open("GET", page);

            oReq.onload = () => {
              oReq.status === 200 ? resolve(JSON.parse(oReq.response).data) : reject(new Error(oReq.statusText));
            };
      
            oReq.onerror = () => {
              reject(new Error("Network error"));
            };

            oReq.send();

        }
       )
      }
}



