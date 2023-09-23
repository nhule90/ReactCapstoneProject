import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const DetailScreen = () => {
  const { id } = useParams();
  const [house, setHouse] = useState([]);
  const url = `http://localhost:4006/house/${id}`;
  const getHouse = () => {
    axios.get(url).then((res) => {
      setHouse(res.data);
      // console.log(res.data);
    });
  };

  useEffect(() => {
    getHouse();
  }, []);

  return (
      <div>
          <h1>Information about the house #{house.id}</h1>
          <img src={house.photo_link} />
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
              <li>
                  <b>Number of bedrooms</b>: {house.num_bed}
              </li>
              <li>
                  <b>Number of bathrooms</b>: {house.num_bath}
              </li>
              <li>
                  <b>Created at</b>: {house.createdAt}
              </li>
              <li>
                  <b>Updated at</b>: {house.updatedAt}
              </li>
          </ul>
      </div>
  );
};

export default DetailScreen;