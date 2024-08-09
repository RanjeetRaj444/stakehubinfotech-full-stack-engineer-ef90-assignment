import React from "react";
import Form from "./components/Form";
import Fullfield from "./components/Fullfield";
import PendingTable from "./components/PendingTable";

const App = () => {
	return (
		<div className="app">
			<h1>Order Matching System</h1>
      <Form/>
      <PendingTable/>
      <Fullfield/>
		</div>
	);
};

export default App;
