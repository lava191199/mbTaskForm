import * as types from './actionTypes';


const initialState = {
    covidReportsData: '',
    searchKey: '',
    distDetails: '',
    dataType:''
}

const covidReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_COVID_REPORTS_DATA_RESPONSE:
            state = {
                ...state,
                covidReportsData: action?.payload
            }
            break;
        case types.SEARCH_KEY:
            state = {
                ...state,
                searchKey: action?.payload
            }
            break;
        case types.DISTRICT_DETAILS_OF_STATE:
            state = {
                ...state,
                distDetails: action?.payload?.distData,
                dataType: action?.payload?.dataType,
            }
            break;
        default:
            state = {
                ...state
            };
            break;
    }
    return state;
}

export default covidReducer;