import React, { useState, useEffect, useMemo } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import TopRestaurants from "./TopRestaurant";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9920611&lng=77.6527173&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const jsonData = await response.json();

      const resLists =
        jsonData.data.cards[4]?.card.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      const topRestaurantsList = jsonData.data.cards[1]?.card.card || [];

      setListOfRestaurants(resLists);
      setTopRestaurants(topRestaurantsList);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ useMemo to optimize filtering
  const filteredRestaurants = useMemo(() => {
    let temp = listOfRestaurants;

    if (isTopRatedActive) {
      temp = temp.filter((item) => item.info.avgRating > 4.4);
    }

    if (searchText.trim() !== "") {
      temp = temp.filter((item) =>
        item.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return temp;
  }, [searchText, isTopRatedActive, listOfRestaurants]);

  const handleTopRated = () => {
    setIsTopRatedActive((prev) => !prev);
  };

  const resetAllFilter = () => {
    setSearchText("");
    setIsTopRatedActive(false);
  };
  const filterByName = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div id="main">
      <TopRestaurants topRestaurants={topRestaurants} />
      <hr className="divider-gradient" />

      {/* Filters */}
      <div className="search-item">
        <div className="allFilter">
          <div className="top-rated">
            <button className="topRatedBtn" onClick={handleTopRated}>
              {isTopRatedActive ? "Show All" : "Top Rated"}
            </button>
          </div>
          <div className="search-restaurants">
            <input
              id="search-restaurant"
              value={searchText}
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

      {/* Loader / Results */}
      {loading ? (
        <Shimmer />
      ) : filteredRestaurants.length === 0 ? (
        <p>No restaurants found</p>
      ) : (
        <div className="res-container">
          {filteredRestaurants.map((item) => (
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
