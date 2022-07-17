import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { ParentContext } from '../container/covidcontext';
import '../CovidReorts.css';
function DistrictItem() {
  const distName = useContext(ParentContext);
  const covidReportDist = useSelector((state) => state?.covidReducer?.distDetails?.districtData?.find((item) => item?.district === distName));

  return (
    <div className='country' >
      <h2>{`DIST :${covidReportDist?.district}`}</h2>
      <div className='dist'>
        <p>{`Active :${covidReportDist?.active}`}</p>
        <p>{`Confirmed :${covidReportDist?.confirmed}`}</p>
        <p>{`Deaths :${covidReportDist?.deceased}`}</p>
        <p>{`Recovered :${covidReportDist?.recovered}`}</p>
        <p>{`Migrated Cases :${covidReportDist?.migratedother}`}</p>
      </div>
    </div>
  )
}

export default DistrictItem