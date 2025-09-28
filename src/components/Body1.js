import { useState, useEffect, useMemo } from "react";

import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body1 = () => {
  const [listOfRestaurants, setListOFRestaurants] = useState([]);
  const [isTopRated, setIsTopRated] = useState(false);
  const [findByName, setFindByName] = useState("");

  const fetchRestaurants = async () => {
    try {
      const responseData = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9920611&lng=77.6527173&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const jsonData = await responseData.json();
      console.log(jsonData);

      const resLists =
        jsonData.data.cards[4]?.card.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setListOFRestaurants(resLists);
    } catch (err) {
      console.log("Error is", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filterRestaurants = useMemo(() => {
    let temp = listOfRestaurants;
    if (isTopRated) {
      temp = temp.filter((item) => item.info.avgRating >= 4.3);
    }
    if (findByName != "") {
      console.log("not empty");
      temp = temp.filter((item) =>
        item.info.name.toLowerCase().includes(findByName.toLowerCase())
      );
      console.log(temp);
    }
    console.log("temp", temp);
    return temp;
  }, [findByName, isTopRated, listOfRestaurants]);

  const filterTopRatedRestaurants = () => {
    setIsTopRated((prev) => !prev);
  };

  const resetAllFilter = () => {
    setIsTopRated(false);
    setFindByName("");
  };
  const filterByName = (e) => {
    setFindByName(e.target.value);
  };
  return (
    <>
      <div className="search-item">
        <div className="allFilter">
          <div className="top-rated">
            <button className="topRatedBtn" onClick={filterTopRatedRestaurants}>
              {isTopRated ? "Show All" : "Top Rated"}
            </button>
          </div>
          <div className="search-restaurants">
            <input
              id="search-restaurant"
              value={findByName}
              onChange={filterByName}
              placeholder="Search Restaurants..."
            />
          </div>
        </div>
        <div className="top-rated">
          <button className="resetBtn" onClick={resetAllFilter}>
            Reset Filters
          </button>
        </div>
      </div>
      {filterRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="res-container">
          {filterRestaurants.map((item) => (
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
    </>
  );
};

export default Body1;
