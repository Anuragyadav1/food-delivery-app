import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetchAllOrders
  const [updating, setUpdating] = useState(false); // Loading state for status update

  const fetchAllOrders = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const statusHandler = async (event, orderId) => {
    setUpdating(true); // Start updating
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchAllOrders(); // Refresh the order list after update
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating status");
    } finally {
      setUpdating(false); // Stop updating
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      {loading ? (
        <p className='loading'>Loading orders...</p> // Show loading message while fetching orders
      ) : (
        <div className="order-list">
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div className='order-item-address'>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  disabled={updating} // Disable while updating
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
