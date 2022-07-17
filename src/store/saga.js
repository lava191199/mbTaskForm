import { all } from 'redux-saga/effects';
import covidReportsSaga from './covid/saga';
import taskSaga from './mbTask/saga';

export default function* rootSaga() {
    yield all([

        //public
        covidReportsSaga(),
        taskSaga()

    ])
}