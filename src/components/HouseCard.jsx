import React from "react";
import {MdOutlineFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';



const HouseCard = ({house, addHouse, removeHouse, list}) => {
    const inWatchlist = list.filter((hou) => {
        return hou.id === house.id;
    });

    const button = inWatchlist.length === 0 ? (
        <button onClick={
            () => addHouse(house)
} > < MdOutlineFavoriteBorder /> </button>


    ) : (
        <button onClick={
            () => removeHouse(house)
        }><MdOutlineFavorite/></button>
    );

    return (
        <div className="house-card">
            <div>
                <img src={
                    house.photo_link
                }/>
                {button}
                <ul>
                    <li><b>Address</b>: {house.address}</li>
                    <li><b>Zipcode</b>: {house.zipcode}</li>
                    <li><b>Price</b>: ${house.price}</li>
                    <li><b>#Bedrooms</b>: {house.num_bed}</li>
                    <li><b>#Bathrooms</b>: {house.num_bath}</li>
                </ul>
            </div>
            </div>
    );;
};

export default HouseCard;
