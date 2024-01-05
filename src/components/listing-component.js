import { useContext, useEffect, useState } from "react"
import { usePromise } from "../hooks/usePromise"
import { apiService } from "../services/api-service"
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import { Character } from "./characters-component";
import { ApiContext, UserContext } from "../App";
// import { apiContext } from "../App";

const sortByOptions = ['name', 'height', 'mass'];

export const ListingComponent = () => {

    const [page, setPage] = useState(1);

    const [sortedData, setSortedData] = useState();

    const [sortBy, setSortBy] = useState(sortByOptions[0]);



    // const [loading, data, error, update] = usePromise();

    const { data, update } = useContext(ApiContext);

    const { clear } = useContext(UserContext);


    // using debounced search (will fire search api after 1 second of typing)
    const [searchKeyword, setSearchKeyword, directSetKeyword] = useDebounce(null);

    useEffect(() => {
        loadCharacters(page, '')
    }, []);

    const loadCharacters = (page, searchKeyword) => {
        searchKeyword = searchKeyword || '';
        let key = page;
        if (searchKeyword) {
            key += searchKeyword;
        }
        key = key.toString()
        if (!data[key]) {

            apiService.peoples(page, searchKeyword).then(
                res => update({ [key]: res.response })
            );
        }
        // update(p);

    }

    const handlePageChange = (event) => {
        setSortedData()
        setPage(event.target.value);
        loadCharacters(event.target.value, searchKeyword);
    };

    const handleSearch = (event) => {

        if (event.target.value === '') {
            directSetKeyword('')
            setPage(1);
            setTimeout(() => loadCharacters(1, ''), 100);
        }
        else {
            setSearchKeyword(event.target.value);
        }
    }



    useEffect(() => {
        let key = page;
        if (searchKeyword) {
            key += searchKeyword;
        }
        key = key.toString()
        console.log(key, data)
        if (data[key] && data[key].results) {
            handleSortBy(sortBy);
        }
        else {
            setSortedData()
        }
    }, [data]);

    const handleSortBy = (sortBy) => {
        let key = page;
        if (searchKeyword) {
            key += searchKeyword;
        }
        key = key.toString()
        setSortBy(sortBy);
        const results = data[key].results;
        if (sortBy === 'name') {
            results.sort((a, b) => a.name.localeCompare(b.name))
        }
        else {
            results.sort((a, b) => a[sortBy] - b[sortBy]);
        }
        data[key].results = results;
        console.log(data[key].results)
        console.log(data[key])
        setSortedData(JSON.parse(JSON.stringify(data[key])))
    }


    useEffect(() => {
        if (searchKeyword !== null && !!searchKeyword) {
            setPage(1);
            loadCharacters(1, searchKeyword);
        }
    }, [searchKeyword]);

    // if (error) {
    //     return <div>{error}</div>
    // }

    return (
        <div className="h-100">
            {sortedData ? (
                <div className="flex justify-content-center">
                    <div className="flex align-items-center justify-content-evenly" style={{ gap: '8px', marginTop: 8 }}>
                        <input className="w-100" onChange={handleSearch} placeholder="Search a character" />
                        <div className="flex flex-direction-column align-items-center justify-content-center w-100">
                            Sort By: <select onChange={e => handleSortBy(e.target.value)}>
                                {sortByOptions.map((sortLabel, index) => <option value={sortLabel} key={index}>{sortLabel}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-direction-column align-items-center justify-content-center w-100">
                            Go to page
                            <select value={page} onChange={handlePageChange}>
                                {new Array(Math.ceil(sortedData.count / 10)).fill(0).map((_, index) => index + 1).map((pageNumber) => {
                                    return <option key={pageNumber} value={pageNumber}> {pageNumber} </option>
                                })}
                            </select>
                        </div>

                        <Link to={'/favourites'}>Favourites</Link>
                        <button onClick={() => clear(null)} className="button remove-button">Logout</button>
                    </div>
                </div>
            ) : null}
            {sortedData ? (
                <Character data={sortedData} />
            ) : <p>Loading...</p>}
        </div>
    )


}