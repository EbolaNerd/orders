import express, { Application } from "express";
import "dotenv/config";
import orderRoute from "./routes/order";

const app: Application = express();
app.use(express.json());
//Route handlers
app.use("/api/order", orderRoute);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
   console.log(`Starting Order Service. Listening on PORT ${PORT}`);
});

module.exports = server;
