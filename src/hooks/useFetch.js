import { useEffect, useState } from "react";

export const usePromise = (promiseData)=> {
    const [promise,setPromise] = useState(promiseData);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [data,setData] = useState();

    useEffect(()=>{
        if(promise){
        console.log('i ran')
        setLoading(true);
        setError(false);
        promise.then(response => {
            console.log(response,'tushar')
            if(response.error){
                setError(response.error.toString());
            }
            else{
                setData(response.response);
            }
        }).catch(error => setError(error.error)).finally(()=>setLoading(false));
    }
    },[promise]);

    const update = (promiseData) => {
        setPromise(promiseData);
    }


    return [loading,data,error,update];

}