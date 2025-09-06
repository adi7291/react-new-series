import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { restaurant } from "../utils/restaurants";

const Body = () => {
  let resList = restaurant.card.card.gridElements.infoWithStyle.restaurants;

  const [topRatedList, setTopRatedList] = useState(resList);

  const handleTopRated = () => {
    console.log("clicked");
    if (resList.length == 0) {
      throw new Error("There are no restaurant in the list");
    }
    const filterTopRatedList = resList.filter(
      (item) => item.info.avgRating > 4.5
    );
    console.log(filterTopRatedList);
    setTopRatedList(filterTopRatedList);
  };

  return (
    <div id="main">
      <div className="searchItem">
        <div className="top-rated">
          <button className="topRatedBtn" onClick={handleTopRated}>
            Top Rated
          </button>
        </div>
      </div>
      <div className="res-container">
        {topRatedList.map((item, index) => (
          <RestaurantCard
            key={item.info.id}
            image={item.info.cloudinaryImageId}
            name={item.info.name}
            rating={item.info.avgRating}
            time={item.info.sla.deliveryTime}
            cuisine={item.info.cuisines}
          />
        ))}
      </div>
    </div>
  );
};
export default Body;
