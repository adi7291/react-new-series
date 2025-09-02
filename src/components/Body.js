import RestaurantCard from "./RestaurantCard";
import { restaurant } from "../utils/restaurants";

const Body = () => {
  let resList = restaurant.card.card.gridElements.infoWithStyle.restaurants;
  console.log(resList);
  return (
    <div id="main">
      <div className="searchItem">Search</div>
      <div className="res-container">
        {resList.map((item, index) => (
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
