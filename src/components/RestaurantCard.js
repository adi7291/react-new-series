import { CDN_URL } from "../utils/constants";
const RestaurantCard = ({ image, name, cuisine, time, rating }) => {
  return (
    <div className="res-card">
      <div className="card-image">
        <img className="res-logo" alt="res-logo" src={`${CDN_URL}${image}`} />
      </div>
      <div className="res-detail">
        <h5 className="res-name">{name}</h5>
        <div className="rate-time">
          <p className="res-rating">Rating-{rating}</p>
          <p className="time">{time} minutes</p>
        </div>

        <p className="cuisine">{cuisine.join(", ")}</p>
      </div>
    </div>
  );
};
export default RestaurantCard;
