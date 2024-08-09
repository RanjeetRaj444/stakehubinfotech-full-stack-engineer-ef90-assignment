import React from "react";

const PendingTable = () => {
	return (
		<div>
			<h1>Pending</h1>
			<table>
				<tr>
					<th>Buyer Qty</th>
					<th>Buyer Price</th>
					<th>Seller Qty</th>
					<th>Seller Price</th>
				</tr>
				<tr>
					<td>100</td>
					<td>$10</td>
					<td>150</td>
					<td>$12</td>
				</tr>
				<tr>
					<td>200</td>
					<td>$9</td>
					<td>180</td>
					<td>$11</td>
				</tr>
				<tr>
					<td>150</td>
					<td>$11</td>
					<td>170</td>
					<td>$13</td>
				</tr>
			</table>
		</div>
	);
};

export default PendingTable;
