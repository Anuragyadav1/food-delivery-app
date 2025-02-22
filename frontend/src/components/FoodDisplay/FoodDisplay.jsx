import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/ContextStore';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext);
  // console.log("food listing", food_list)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      {loading ? (
        <p className='loading'>Loading dishes...</p> 
      ) : (
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
