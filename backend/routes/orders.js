const express = require("express");
const router = express.Router();
const PendingOrder = require("../models/pendingOrder");
const CompletedOrder = require("../models/completedOrder");

router.get("/pending", async (req, res) => {
	const pendingOrders = await PendingOrder.find();
	res.json(pendingOrders);
});

router.get("/completed", async (req, res) => {
	const completedOrders = await CompletedOrder.find();
	res.json(completedOrders);
});

router.post("/place_order", async (req, res) => {
	const { buyerQty, buyerPrice, sellerPrice, sellerQty } = req.body;
	const newOrder = { buyerQty, buyerPrice, sellerPrice, sellerQty };

	// Match orders
	const pendingOrders = await PendingOrder.find();
	for (const order of pendingOrders) {
		if (newOrder.buyerPrice === order.sellerPrice) {
			const qtyToMatch = Math.min(newOrder.buyerQty, order.sellerQty);
			await CompletedOrder.create({
				price: newOrder.buyerPrice,
				qty: qtyToMatch,
			});

			newOrder.buyerQty -= qtyToMatch;
			order.sellerQty -= qtyToMatch;

			if (order.sellerQty === 0) {
				await PendingOrder.findByIdAndDelete(order._id);
			} else {
				await PendingOrder.findByIdAndUpdate(order._id, {
					sellerQty: order.sellerQty,
				});
			}

			if (newOrder.buyerQty === 0) break;
		}
	}

	if (newOrder.buyerQty > 0) {
		await PendingOrder.create(newOrder);
	}

	res.json({ success: true });
});

module.exports = router;
