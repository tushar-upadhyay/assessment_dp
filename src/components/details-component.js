import { useEffect } from "react"

import { useMultiPromise, usePromise } from "../hooks/usePromise"
import { apiService } from "../services/api-service"
import { useParams } from "react-router"
import { parseTableHeaders } from "../utils"
import { MovieDetails } from "./movie-component"

export const DetailsComponent = () => {

    const params = useParams();

    const [loading, detailsData, error, updateDetails] = usePromise();

    const [loadingMovies, moviesData, moviesError, updateMovieDetails] = useMultiPromise();


    useEffect(() => {
        if (params && params.id) {
            const p = apiService.peopleDetails(params.id);
            updateDetails(p);
        }
    }, [params]);


    useEffect(() => {
        if (detailsData && detailsData.films) {
            const promises = [];

            for (let f of detailsData.films) {
                const p = apiService.movieDetails(f);
                promises.push(p);
            }

            updateMovieDetails(promises);
        }
    }, [detailsData])


    if (error) {
        return <div>{error}</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex justify-content-center align-items-center flex-direction-column">
            <h3>Character Details</h3>
            <div className="card">
                <table className="w-100">
                    {parseTableHeaders(detailsData).map((header,index) => {
                        return (
                            <tr key={index}>
                                <th> {header} </th>
                                <td> {detailsData[header]} </td>
                            </tr>
                        )
                    })}
                </table>
                <h4> Films</h4>
                {moviesData ? <MovieDetails movieData={moviesData} /> : <p> Loading Films....</p>}

            </div>

        </div>
    )

}