const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const ordersRoute = require("./routes/orders");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
	.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Routes
app.use("/api/orders", ordersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
