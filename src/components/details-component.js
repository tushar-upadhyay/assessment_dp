import { useContext, useEffect, useState } from "react"
import { APIContext } from "../contexts/api-context"
import { usePromise } from "../hooks/useFetch"
import { apiService } from "../services/api-service"

export const DetailsComponent = ()=> {

    const [page,setPage] = useState(1);
    
    const [loading,data,error,update] = usePromise(apiService.peoples());


    useEffect(()=>{
        const p = apiService.peoples(page);
        update(p);
    },[page])


    if(error){
        return <div>Some error {error}</div>
    }

    if(loading){
        return <div>Loading...</div>
    } 

    return (
        <div>
            {data.results.map((d,index)=>{
                return <p key={index}>{d.name}</p>
            })}
        </div>
    )

}