import * as types from './actionTypes';

export const getCollegeDataRequest = () =>{
    return{
        type: types.GET_COLLEGE_DATA_REQUEST
    }
}
export const getCollegeDataResponse = (data) =>{
    return{
        type: types.GET_COLLEGE_DATA_RESPONSE,
        payload: data
    }
}