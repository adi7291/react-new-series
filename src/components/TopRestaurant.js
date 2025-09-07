import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

const TopRestaurants = ({ header, topRestaurants }) => {
  let details = topRestaurants?.gridElements?.infoWithStyle?.restaurants;
  console.log("details----", details);
  return (
    <div className="top-restaurants">
      <h2>{topRestaurants?.header?.title}</h2>
      <div className="top-restaurants-details">
        {details?.map((item) => {
          return (
            <RestaurantCard
              key={item.info.id}
              image={item.info.cloudinaryImageId}
              name={item.info.name}
              rating={item.info.avgRating}
              time={item.info.sla.deliveryTime}
              cuisine={item.info.cuisines}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopRestaurants;
