import { memo, useEffect, useState } from "react";

export const usePromise = (promiseData) => {
    const [promise, setPromise] = useState(promiseData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if (promise) {
            setLoading(true);
            setError(false);
            promise
                .then(response => {
                    if (response.error) {
                        setError(response.error.toString());
                    }
                    else {
                        setData(response.response);
                    }
                })
                .catch(error => setError(error.error))
                .finally(() => setLoading(false));
        }
    }, [promise]);

    const update = (promiseData) => {
        setPromise(promiseData);
    }

    return [loading, data, error, update];

}

export const useMultiPromise = (promisesData) => {
    const [promises, setPromise] = useState(promisesData || []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if (promises.length > 0) {
            const tempData = [];
            setLoading(true);
            setError(false);
            Promise.all(promises)
                .then(resolvedPromises=>{
                    for(let response of resolvedPromises){
                         tempData.push(response.response);
                    }
                    setData(tempData);
                })
                .catch(error => setError(error.error))
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [promises]);

    const update = (promisesData) => {
        setPromise(promisesData);
    }

    return [loading, data, error, update];

}