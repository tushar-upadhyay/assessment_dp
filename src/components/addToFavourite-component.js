export const AddToFavourite = ({ id, fData, setFavouriteData, characterData }) => {

    const handleClick = (event, add = true) => {
        event.stopPropagation();
        setFavouriteData({ [id]: { ...characterData, isAdded: add } });
    }

    if (fData && fData.isAdded) {
        return <button key={id} className="button remove-button" onClick={(e) => handleClick(e, false)}>Remove from favourites</button>
    }

    return <button key={id} className="button add-button" onClick={(e) => handleClick(e, true)}>Add to favourites</button>

}