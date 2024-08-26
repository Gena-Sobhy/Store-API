require("dotenv").config();
require("express-async-errors")
const express = require('express');
const connect = require("./db/connect");

const productsRouter = require("./routes/products")
const notFoundMiddleware = require("./middleware/not-found");
const errMiddleware = require("./middleware/error-handler");

const app = express();
app.use(express.json());

// Routes

app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

app.use("/api/v1/products", productsRouter);

// Products route

// err handler middlewares
app.use(notFoundMiddleware);
app.use(errMiddleware);



const PORT = process.env.PORT || 3000;

const start = async () => {
    try{
        await connect(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    } catch(err) {
        throw err;
    }
}
start();