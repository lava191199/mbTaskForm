import React, { Component } from 'react';
import { SuperParentContext } from './covidcontext';
import {
    CovidReportManager, CovidReportParent, CovidReportsItem, DistrictManager,  DistrictItem
} from './covidindex';
import { batch } from 'react-redux';
import { connect } from 'react-redux';
import { getCovidReportsDataRequest } from '../../../store/covid/actions';

export class CovidMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            covidReportManager: CovidReportManager,
            covidReportsItem: CovidReportsItem,
            districtManager: DistrictManager,
            districtItem: DistrictItem
        }
    }
    componentDidMount() {
        batch(() => {
            this.props.getCovidReportsDataRequest(true);
        })
    }
    render() {
        return (
            <SuperParentContext.Provider value={this.state}>
                <CovidReportParent />
            </SuperParentContext.Provider>
        )
    }
}

export default connect(null, { getCovidReportsDataRequest })(CovidMain);