import { useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { parseId } from "../utils";
import { AddToFavourite } from "./addToFavourite-component";

export const Character = ({ data, showFavourites }) => {

    const [favouriteData, setFavouriteData] = useLocalStorage();
    const navigate = useNavigate();


    const getData = () => {
        if (!data) {
            return Object.keys(favouriteData || {}).map((key) => favouriteData[key]);
        }
        return data.results;
    }


    return (
        <div className="flex flex-direction-column justify-content-center align-items-center card-container">
            <h2>{showFavourites ? 'Favourite Characters' : null}</h2>
            {getData().map((d, index) => {
                if (!showFavourites || d.isAdded) {
                    return (
                        <div onClick={() => navigate(`/details/${parseId(d.url)}`)} key={index} className="card cursor-pointer">
                            <div className="flex justify-content-between align-items-center">
                                <p key={index}>{d.name}</p>
                                <AddToFavourite characterData={d} setFavouriteData={setFavouriteData} id={parseId(d.url)} fData={favouriteData && favouriteData[parseId(d.url)]} />
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}