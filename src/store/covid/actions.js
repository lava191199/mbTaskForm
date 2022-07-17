import * as types from './actionTypes';

export const getCovidReportsDataRequest = (data) => {
    return {
        type: types.GET_COVID_REPORTS_DATA_REQUEST
    }
}

export const getCovidReportsDataResponse = (covidReportsData) => {
    return {
        type: types.GET_COVID_REPORTS_DATA_RESPONSE,
        payload: covidReportsData
    }
}
export const searchKey = (key) => {
    return {
        type: types.SEARCH_KEY,
        payload: key
    }
}

export const districtDetailsOfState = (distData,dataType) => {
    return {
        type: types.DISTRICT_DETAILS_OF_STATE,
        payload: {distData, dataType}
    }

}