import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { restaurant } from "../utils/restaurants";
import Shimmer from "./Shimmer";
import TopRestaurants from "./TopRestaurant";

const Body = () => {
  let resList = restaurant.card.card.gridElements.infoWithStyle.restaurants;

  const [topRatedList, setTopRatedList] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);

  //useEffect()
  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9920611&lng=77.6527173&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await response.json();

    const resLists =
      jsonData.data.cards[4]?.card.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setTopRatedList(resLists);
    const topRestaurantsList = jsonData.data.cards[1]?.card.card;
    console.log(topRestaurantsList);
    setTopRestaurants(topRestaurantsList);
  };

  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  const handleTopRated = () => {
    console.log("clicked");
    if (resList.length == 0) {
      throw new Error("There are no restaurant in the list");
    }
    const filterTopRatedList = resList.filter(
      (item) => item.info.avgRating > 4.7
    );
    setTopRatedList(filterTopRatedList);
  };

  return (
    <div id="main">
      <TopRestaurants topRestaurants={topRestaurants} />
      <hr className="divider-gradient" />
      <div className="searchItem">
        <div className="top-rated">
          <button className="topRatedBtn" onClick={handleTopRated}>
            Top Rated
          </button>
        </div>
      </div>
      {topRatedList.length == 0 ? (
        <Shimmer />
      ) : (
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
      )}
    </div>
  );
};
export default Body;
