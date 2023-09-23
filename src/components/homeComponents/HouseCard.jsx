import React from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const HouseCard = ({ house, addHouse, removeHouse, list }) => {
    const navigate = useNavigate();
    const inWatchlist = list.filter((hou) => {
        return hou.id === house.id;
    });

    const button =
        inWatchlist.length === 0 ? (
            <button onClick={() => addHouse(house)}>
                {" "}
                <MdOutlineFavoriteBorder />{" "}
            </button>
        ) : (
            <button onClick={() => removeHouse(house)}>
                <MdOutlineFavorite />
            </button>
        );
    const handleClick = () => {
        navigate(`/house/${house.id}`);
    };
    return (
        <div className="house-card">
            <div>
                <img src={house.photo_link} />
                {button}
                <ul>
                    <li>
                        <b>Address</b>: {house.address}
                    </li>
                    <li>
                        <b>Zipcode</b>: {house.zipcode}
                    </li>
                    <li>
                        <b>Price</b>: ${house.price}
                    </li>
                </ul>
                <button className="blue-btn" onClick={handleClick}>
                    See More
                </button>
            </div>
        </div>
    );
};

export default HouseCard;
