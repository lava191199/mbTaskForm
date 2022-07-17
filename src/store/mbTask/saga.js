import * as types from './actionTypes';
import * as actions from './actions';
import { all, fork, put, call, takeLeading } from "redux-saga/effects";
import axios from 'axios';

function* getCollegeData(action) {
    console.log("getCollegeData_Start=>", action);
    let collegesData;
    try {
        const apiFetch = async () => { return await axios.get("http://universities.hipolabs.com/search?name=middle") };
        const response = yield call(apiFetch);
        console.log("getCollegeData_Response", response);

        if (response && response?.status === 200) {
            collegesData = response?.data
        }
    } catch (err) {
        const error = err;
        console.log("getCollegeData_ERROR=>", error);
    }
    console.log("getCollegeData_END", collegesData);
    yield put(actions.getCollegeDataResponse(collegesData));
};



export function* taskWatcher() {
    yield takeLeading(types.GET_COLLEGE_DATA_REQUEST, getCollegeData);
}

function* taskSaga() {
    yield all([fork(taskWatcher)]);
}
export default taskSaga;