import React, { useContext } from 'react'
import { ParentContext } from '../container/covidcontext'
import { useSelector, useDispatch } from 'react-redux';
import '../CovidReorts.css';
import { districtDetailsOfState } from '../../../store/covid/actions';

function CovidReportsItem() {
  const stateName = useContext(ParentContext);
  const dispatch = useDispatch();
  const covidReport = useSelector((state) => state?.covidReducer?.covidReportsData?.find((item) => item?.state === stateName));


  return (
    <div className='country' onClick={() => dispatch(districtDetailsOfState(covidReport, "DISTRICT"))}>
      <h2>{covidReport?.state}</h2>
      <div className='describe'>
        <p>{`Active :${covidReport?.stateActiveCases}`}</p>
        <p>{`Confirmed :${covidReport?.stateConfirmed}`}</p>
        <p>{`Deaths :${covidReport?.stateDecesed}`}</p>
        <p>{`Recovered :${covidReport?.stateRecovered}`}</p>
        <p>{`Migrated Cases :${covidReport?.stateMigratedother}`}</p>
      </div>
    </div>
  )
}

export default CovidReportsItem