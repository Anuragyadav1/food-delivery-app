import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [removingId, setRemovingId] = useState(null); // Track the item being removed

  const fetchList = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Error fetching list");
    }
    finally{
      setLoading(false); // Set loading state to false after fetching

    }
  };

  const removeFood = async (foodId) => {
    setRemovingId(foodId); // Set the id of the item being removed
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list after removal
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Error removing food item");
    } finally {
      setRemovingId(null); // Reset after operation
    }
  };

  // Fetch the list whenever the component is mounted
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food Lists</p>
      {loading ? ( // Show loading text if data is still loading
        <p className='loading'>Loading...</p>
      ):(
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p
              onClick={() => removeFood(item._id)}
              className='cursor'
              disabled={removingId === item._id} // Disable if this item is being removed
            >
              {removingId === item._id ? "Removing..." : "x"}
            </p>
          </div>
        ))}
      </div>
    )}
    </div>
  );
};

export default List;
