import React, { useContext } from 'react'
import { SuperParentContext } from '../container/covidcontext'
import { useSelector } from 'react-redux';

function CovidReportParent() {
    const context = useContext(SuperParentContext);
    const dataType = useSelector((state) => state?.covidReducer?.dataType) || "STATE";

    return (<>
    {dataType === "STATE" ? <context.covidReportManager /> : <context.districtManager />}
    </>
            
    )
}

export default CovidReportParent