import React, { useState, useEffect } from "react";

const Form = () => {
	const [person, setPerson] = useState("seller");

	function submitFormData(e) {
		e.preventDefault();
		console.log("Ranjeet Kumar Raj")
	}

	useEffect(() => {
		// console.log(person);
	}, [person]);

	return (
		<div className="form">
			<div className="heading">
				<div>
					<h1>Add your Requirement</h1>
				</div>
				<div>
					<select
						value={person}
						name=""
						id=""
						onChange={(e) => setPerson(e.target.value)}
					>
						<option value="buyer">Buyer</option>
						<option value="seller">Seller</option>
					</select>
				</div>
			</div>
			<div className="body">
				<form action="" onSubmit={submitFormData}>
					<input
						type="text"
						placeholder={`${
							person === "buyer" ? "Buyer Quantity" : "Seller Quantity"
						}`}
						name=""
					/>
					<input
						type="text"
						placeholder={`${
							person === "buyer" ? "Buyer Price" : "Seller Price"
						}`}
						name=""
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default Form;
