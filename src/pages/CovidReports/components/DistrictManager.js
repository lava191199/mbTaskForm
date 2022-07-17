import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { districtDetailsOfState } from '../../../store/covid/actions';
import { ParentContext, SuperParentContext } from '../container/covidcontext';
import '../CovidReorts.css';

function DistrictManager() {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState("");
    const [sort, setSort] = useState(false);
    const context = useContext(SuperParentContext);
    const districtData = useSelector((state) => state?.covidReducer?.distDetails);
    const distDetails = districtData ? districtData?.districtData : [];
    const filteredData = (distDetails && searchKey?.length !== 0) ?
        distDetails?.filter((item) => item?.district?.toLowerCase()?.startsWith(searchKey?.toLowerCase())) : distDetails;
    const sortedFilteredData = sort ? [...filteredData]?.sort((a, b) => b?.active - a?.active) : filteredData;
    console.log("filteredDatDistrictManager___", { filteredData, sortedFilteredData });

    return (
        <>
            <div className='dist'>
                <input name='searchKey' placeholder="Enter District Name" onChange={(e) => setSearchKey(e.target.value)} />
                <h2>{districtData?.state}</h2>
                {filteredData?.length !== 0 && <h3 onClick={() => setSort(!sort)} className="sort">{sort ? "Unsort Active Cases" : "Sort Active Cases"} </h3>}
                <button onClick={() => dispatch(districtDetailsOfState(null, "STATE"))} >Back</button>
            </div>
            <div className="countrylist">
                {searchKey?.length !== 0 && sortedFilteredData?.length === 0 && <div>No Search Data Found</div>}
                {searchKey?.length === 0 && sortedFilteredData?.length === 0 && <div>No Search Data Found</div>}
                {sortedFilteredData && sortedFilteredData.length > 0 && sortedFilteredData.map((item, index) => (
                    <ParentContext.Provider key={item?.district} value={item.district}>
                        <context.districtItem />
                    </ParentContext.Provider>
                ))}
            </div>
        </>
    )
}

export default DistrictManager