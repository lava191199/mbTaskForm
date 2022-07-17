import * as types from './actionTypes';
import * as actions from './actions';
import { all, fork, put, call, takeLeading } from "redux-saga/effects";
import axios from 'axios';

function* getCovidReportsData(action) {
    console.log("getCovidReportsData_Start=>", action);
    let covidReportsTotalData;
    try {
        const apiFetch = async () => { return await axios.get("https://data.covid19india.org/state_district_wise.json") };
        const response = yield call(apiFetch);
        console.log("getCovidReportsData_Response", response);

        if (response && response?.status === 200) {
            covidReportsTotalData = response?.data && Object.entries(response?.data)?.map((item) => (
                {
                    stateActiveCases: Object.values(item[1]?.districtData)?.map((x) => x?.active)?.reduce((acc, cur) => acc + cur),
                    stateConfirmed: Object.values(item[1]?.districtData)?.map((x) => x?.confirmed)?.reduce((acc, cur) => acc + cur),
                    stateDecesed: Object.values(item[1]?.districtData)?.map((x) => x?.deceased)?.reduce((acc, cur) => acc + cur),
                    stateMigratedother: Object.values(item[1]?.districtData)?.map((x) => x?.migratedother)?.reduce((acc, cur) => acc + cur),
                    stateRecovered: Object.values(item[1]?.districtData)?.map((x) => x?.recovered)?.reduce((acc, cur) => acc + cur),
                    state: item[0],
                    districtData: Object.entries(item[1]?.districtData)?.map((x) => ({ district: x[0], ...x[1] }))
                }
            ));
        }
    } catch (err) {
        const error = err;
        console.log("getCovidReportsData_ERROR=>", error);
    }
    console.log("getCovidReportsData_END", covidReportsTotalData);
    yield put(actions.getCovidReportsDataResponse(covidReportsTotalData));
};


export function* covidReportsWatcher() {
    yield takeLeading(types.GET_COVID_REPORTS_DATA_REQUEST, getCovidReportsData);
}

function* covidReportsSaga() {
    yield all([fork(covidReportsWatcher)]);
}
export default covidReportsSaga;