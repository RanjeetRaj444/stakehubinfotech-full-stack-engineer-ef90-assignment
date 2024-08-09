const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
	.connect(
		"mongodb+srv://ranjeetraj44666:placement-assignment@placement-assignment.xggom9f.mongodb.net/?retryWrites=true&w=majority&appName=Placement-assignment",
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Order Schemas
const pendingOrderSchema = new mongoose.Schema({
	buyerQty: Number,
	buyerPrice: Number,
	sellerPrice: Number,
	sellerQty: Number,
});

const completedOrderSchema = new mongoose.Schema({
	price: Number,
	qty: Number,
	completedAt: { type: Date, default: Date.now },
});

const PendingOrder = mongoose.model("PendingOrder", pendingOrderSchema);
const CompletedOrder = mongoose.model("CompletedOrder", completedOrderSchema);

// Routes
app.get("/api/pending_orders", async (req, res) => {
	const pendingOrders = await PendingOrder.find();
	res.json(pendingOrders);
});

app.get("/api/completed_orders", async (req, res) => {
	const completedOrders = await CompletedOrder.find();
	res.json(completedOrders);
});

app.post("/api/place_order", async (req, res) => {
	const newOrder = req.body;
	await matchOrders(newOrder);
	res.json({ success: true });
});

async function matchOrders(newOrder) {
	const pendingOrders = await PendingOrder.find();

	for (let order of pendingOrders) {
		if (newOrder.buyerPrice === order.sellerPrice) {
			const qtyToMatch = Math.min(newOrder.buyerQty, order.sellerQty);
			await new CompletedOrder({
				price: newOrder.buyerPrice,
				qty: qtyToMatch,
			}).save();

			newOrder.buyerQty -= qtyToMatch;
			order.sellerQty -= qtyToMatch;

			if (order.sellerQty === 0) {
				await PendingOrder.findByIdAndDelete(order._id);
			} else {
				await PendingOrder.findByIdAndUpdate(order._id, {
					sellerQty: order.sellerQty,
				});
			}

			if (newOrder.buyerQty === 0) {
				break;
			}
		}
	}

	if (newOrder.buyerQty > 0) {
		await new PendingOrder(newOrder).save();
	}
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});


// seprate on for the ,ongoosde databaser after thata  i am goin g oitokij creaytre  each and mevry perason |
// usdre2 ko  my mofhiui
// 