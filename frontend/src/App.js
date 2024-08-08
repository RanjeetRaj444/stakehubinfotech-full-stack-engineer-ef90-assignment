import React from 'react';
import OrderForm from './components/OrderForm';
import PriceChart from './components/PriceChart';

const App = () => {
  return (
    <div className="App">
      <h1>Order Matching System</h1>
      <OrderForm />
      <PriceChart />
    </div>
  );
};

export default App;
