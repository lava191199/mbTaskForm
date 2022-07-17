import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { ParentContext, SuperParentContext } from '../container/covidcontext';
import '../CovidReorts.css';

function CovidReportManager() {
    const context = useContext(SuperParentContext);
    const [sort, setSort] = useState(false);
    const [searchKey, setSearchKey] = useState("")
    const countryWideData = useSelector((state) => state?.covidReducer?.covidReportsData) || [];
    const filteredData = (countryWideData && searchKey?.length !== 0) ?
        countryWideData?.filter((item) => item?.state?.toLowerCase()?.startsWith(searchKey?.toLowerCase())) : countryWideData;
    const sortedFilteredData = sort ? [...filteredData]?.sort((a, b) => b?.stateActiveCases - a?.stateActiveCases) : filteredData;
    console.log("filteredDataCovidRsseportManager___", filteredData, sortedFilteredData);
    return (
        <>
            <div>
                <input name='searchKey' placeholder="Enter State Name" onChange={(e) => setSearchKey(e.target.value)} />
            </div>
            {filteredData?.length !== 0 && <h3 onClick={() => setSort(!sort)} className="sort">{sort ? "Unsort Active Cases" : "Sort Active Cases"} </h3>}<br />
            <div className="countrylist">
                {searchKey?.length !== 0 && sortedFilteredData?.length === 0 && <div>No Search Data Found</div>}
                {searchKey?.length === 0 && sortedFilteredData?.length === 0 && <div>No Search Data Found</div>}
                {filteredData && filteredData.length > 0 && sortedFilteredData.map((item, index) => (
                    <ParentContext.Provider key={item?.state} value={item.state}>
                        <context.covidReportsItem />
                    </ParentContext.Provider>
                ))}
            </div>
        </>



    )
}

export default CovidReportManager;