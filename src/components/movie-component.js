import { FILMS_TABLE_HEADERS } from "../constants"

export const MovieDetails = ({ movieData }) => {

    return (
        <table className="w-100">
            <tr>
                {FILMS_TABLE_HEADERS.map((header,index) => <th key={index}>{header}</th>)}
            </tr>
            {movieData.map((data,index) => {
                return (
                    <tr key={index}>
                        {FILMS_TABLE_HEADERS.map((header) => <td>{data[header]}</td>)}
                    </tr>
                )
            })}
        </table>
    )

}