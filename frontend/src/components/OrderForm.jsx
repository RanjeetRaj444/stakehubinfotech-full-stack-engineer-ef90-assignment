import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    buyerQty: '',
    buyerPrice: '',
    sellerPrice: '',
    sellerQty: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders/place_order', formData);
      if (response.data.success) {
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Buyer Qty:
        <input type="number" name="buyerQty" value={formData.buyerQty} onChange={handleChange} />
      </label>
      <label>
        Buyer Price:
        <input type="number" name="buyerPrice" value={formData.buyerPrice} onChange={handleChange} step="0.01" />
      </label>
      <label>
        Seller Price:
        <input type="number" name="sellerPrice" value={formData.sellerPrice} onChange={handleChange} step="0.01" />
      </label>
      <label>
        Seller Qty:
        <input type="number" name="sellerQty" value={formData.sellerQty} onChange={handleChange} />
      </label>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
