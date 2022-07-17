import * as types from './actionTypes';



const initialState = {
    collegeData: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_COLLEGE_DATA_RESPONSE:
            state = {
                ...state,
                collegeData: action?.payload
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

export default taskReducer;