import { useEffect, useState } from "react"

export const useDebounce = (keyword, debounceTime = 1000) => {
    const [data, setData] = useState(keyword);

    const [debouncedData, setDebouncedData] = useState();

    useEffect(() => {
        if (data !== null && !!data) {
            const timeout = setTimeout(() => {
                setDebouncedData(data || '');
            }, debounceTime);
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [data]);


    return [debouncedData, setData,setDebouncedData];

}