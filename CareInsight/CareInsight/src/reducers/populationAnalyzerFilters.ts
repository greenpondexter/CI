import {Record, Map} from 'immutable';
import {POP_ANALYZER_FILTERS, Action} from '../actions/actionsInterface';

const initState = Record({
    filters : {   
        cchgFilter : {
                values: ["All","Healthy Female (16-40)","Gastrointestinal  disorders ","Healthy Female (41-64)",
                        "Healthy Male (16-40)", "Hypertension (Includes stroke & peripheral vascular disease)","Healthy Female (16-40)",
                        "Healthy Female (6-15)","Other mental health/substance abuse","Healthy Male (41-64)","Thyroid disorders",
                        "Healthy Female (65-69)","Diabetes without CAD","CAD without diabetes","Chronic Musculoskeletal/ Osteo Arthritis/ Osteoporosis",
                        "Neurologic disorders","Healthy Male (6-15)","Active cancer","Healthy Child (2-5)","Other chronic conditions",
                        "Liver disease (Hepatitis, Cirrhosis) - post transplant ","Severe rheumatic & other connective tissue disease",
                        "Dermatologic disorders","Healthy Male (70-74)","COPD","Both CAD & diabetes","Healthy Male (65-69)",
                        "Severe heart failure/transplant/rheumatic heart disease/non-rheumatic valvular h",
                        "Renal failure  - post  transplant ","HIV","Mental retardation/disability congentia anomaly","Unhealthy newborns and preemies",
                        "Healthy Female (70-74)","Healthy Infant (0-1)","Hemophilia & sickle cell & chronic blood disorders",
                        "Healthy Female (85+)","Severe dementia","Healthy Female (75-79)","Major psychosis",
                ],
                selected: 'All'
            },

        payerTypeFilter : {
            values : ["All",
                    "MEP - Marketplace EPO",
                    "MEP - Marketplace EPO",
                    "SF - Self Funded",
                    "PPO - Commercial PPO",
                    "MR - Medicare Advantage HMO"
                    ],
            selected: 'All'
        }, 
        ageFilter : {
            values : ["All",
                    "0-9",
                    "11-20",
                    "21-30",
                    "31-40",
                    "41-50",
                    "51-60",
                    "61-70",
                    "71-80",
                    "81-90",
                    "91-100",
                    ],
            selected: 'All'
        }
    }
}) 

export function populationAnalyzerUpdateFilterReducer( state = initState, action: Action<POP_ANALYZER_FILTERS>){
    switch(action.type){
        case 'POP_ANALYZER_FILTERS':
            return Record({'filters' : action.payload.filters})
        default:
            return state; 
    }
}
