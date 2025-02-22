import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = "https://food-del-backend-jp98.onrender.com"
  // const url = "http://localhost:4000"


  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State for user details
   
  // Loading state for food list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (err) {
      setError("Failed to fetch food items."); // Set error message
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };


  
  const fetchUserDetails = async () => {
    try {
      // console.log("Hii")
      const token = localStorage.getItem("token"); 
      const response = await axios.get(url + "/api/user/details", { headers: { token } });
      setUserDetails(response.data.user);
      // console.log(response.data)
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user details.");
    }
  };

  const updateUserDetails = async (updatedDetails) => {
    try {
        const response = await axios.patch(url + "/api/user/update", updatedDetails, { headers: { token } });

        // Check if the response from the backend indicates success
        if (response.data.success) {
            setUserDetails(response.data.updatedUser); // Update the local user details state
            return response.data; // Return the entire backend response (including success status and message)
        } else {
            // Handle backend-reported failure (e.g., old password incorrect)
            setError(response.data.message || "Failed to update user details.");
            return response.data; // Return the backend failure message
        }

    } catch (err) {
        console.error("Update error:", err);
        setError("An error occurred while updating user details.");
        return { success: false, message: "An error occurred while updating user details." };
    }
};

// console.log("ggg")
// console.log(localStorage.getItem("token"))

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");
      await fetchFoodList();
      if (token) {
            setToken(token);
            await fetchUserDetails(); // Fetch user details when token is available


        // setToken(localStorage.getItem("token"));
        // console.log(localStorage.getItem("token"))
        // await fetchUserDetails(); // Fetch user details when token is available
        await loadCartData(localStorage.getItem("token"));
      }
      setLoading(false);
    }

    loadData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    updateUserDetails, // Add this to context value
    userDetails, // Provide user details in context
    fetchUserDetails, // Add fetchUserDetails here
    url,
    token,
    setToken,
    loading, // Add loading to context value
    error,   // Add error to context value
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
