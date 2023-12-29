import { useEffect, useState } from "react"
import { usePromise } from "../hooks/useFetch"
import { apiService } from "../services/api-service"
import { useDebounce } from "../hooks/useDebounce";

const sortByOptions = ['name','height','mass'];

export const ListingComponent = ()=> {

    const [page,setPage] = useState(1);

    const [sortedData,setSortedData] = useState();

    const [sortBy,setSortBy] = useState(sortByOptions[0]);
    
    const [loading,data,error,update] = usePromise();

    const [searchKeyword,setSearchKeyword] = useDebounce(null);

    const callAPI = (page,searchKeyword) => {
        const p = apiService.peoples(page,searchKeyword);
        update(p);
    }

    const handlePageChange = (event)=>{
        setPage(event.target.value);
        callAPI(event.target.value,searchKeyword)
    };


    useEffect(()=>{
        if(data && data.results){
        handleSortBy(sortBy);
        }
    },[data]);

    useEffect(()=>{
        callAPI(page,'')
    },[])

    const handleSortBy = (sortBy)=>{
        setSortBy(sortBy);
        const results = data.results;
        if(sortBy === 'name'){
            results.sort((a,b)=> a.name.localeCompare(b.name))
        }
        else{
        results.sort((a,b)=>a[sortBy] - b[sortBy]);
        }
        data.results = results;
        setSortedData(data)
    }


    useEffect(()=>{
        if(searchKeyword !== null && !!searchKeyword){
            console.log('div')
           setPage(1);
           callAPI(1,searchKeyword);
        }
    },[searchKeyword]);




    if(error){
        return <div>{error}</div>
    }

    return (
        <div className="h-100">
            {sortedData ? (
                <div className="flex justify-content-center">
                <div className="flex align-items-center justify-content-evenly" style={{gap:'8px'}}>
                <input onChange={e=>setSearchKeyword(e.target.value)} placeholder="Search a character" />
                <div className="flex align-items-center justify-content-center">
                    Sort By: <select onChange={e=>handleSortBy(e.target.value)}>
                        {sortByOptions.map((sortLabel,index)=><option value={sortLabel} key={index}>{sortLabel}</option>)}
                    </select>
                </div>
            <div className="flex align-items-center justify-content-center">
                <p>Go to page:</p>
                <select value={page} onChange={handlePageChange}>
                    {new Array(Math.ceil(sortedData.count/10)).fill(0).map((_,index)=>index+1).map((pageNumber)=>{
                        return <option key={pageNumber} value={pageNumber}> {pageNumber} </option>
                    })}
                </select>
            </div>
            
            </div>
                </div>
            ):null}
            {!loading ? (
                            <div className="flex flex-direction-column justify-content-center align-items-center card-container">
                            {data.results.map((d,index)=>{
                                return (
                                    <div className="card">
                                    <p key={index}>{d.name}</p>
                                    </div>
                                    )
                            })}
                            </div>
            ):<p>Loading...</p>}


            
        </div>
    )


}