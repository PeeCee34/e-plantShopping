import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
        onContinueShopping(e);
      }
  };
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };
  


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(item.name));
      }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };
  

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
  return (price * item.quantity).toFixed(2);
  };

  return (
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty. <button onClick={handleContinueShopping}>Continue Shopping</button></p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-image" />
                    <div className="cart-details">
                      <h3>{item.name}</h3>
                      <p>Unit Price: {item.cost}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Subtotal: ${calculateTotalCost(item)}</p>
                      <div className="cart-actions">
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <button onClick={() => handleIncrement(item)}>+</button>
                        <button onClick={() => handleRemove(item)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total: ${calculateTotalAmount(cart)}</h3>
                  <button onClick={handleContinueShopping}>Continue Shopping</button>
                  <button onClick={handleCheckoutShopping}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        );
    };   
      
export default CartItem;
