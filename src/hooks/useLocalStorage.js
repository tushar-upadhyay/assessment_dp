import { useEffect, useState } from "react"

export const useLocalStorage = (key = 'favourites') => {

    const [data,_setData] = useState({});

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(key));
        _setData(data);
    },[]);

    const setData = (newData)=> {
        localStorage.setItem(key,JSON.stringify({...data,...newData}));
        _setData(data => ({...data,...newData}));
    }

    const clear =()=>{
        localStorage.clear();
        _setData();
    }

    return [data,setData,clear];
}