import express, { Router, Request, Response } from "express";
import Order from "../models/order";
import { validateAge } from "../utils/calculator";
const router: Router = express.Router();

//In-mem order repo v1.0.5
const orders: Order[] = [];

router.get("/", (req: Request, res: Response) => {
   res.send(orders);
});

router.get("/:id", (req: Request, res: Response) => {
   const id = req.params.id;
   if (!id) return res.status(401).send("Invalid request");

   const order = orders.find((u) => u.id === parseInt(id));
   if (!order) return res.status(404).send("Order not found");

   res.send(order);
});

router.post("/", (req: Request, res: Response) => {
   const { name, phone, age } = req.body;
   if (!name) return res.status(401).send("Please provide name");
   if (!phone) return res.status(401).send("Please provide phone number");
   if (!age) return res.status(401).send("Please provide age");

   if (!validateAge(age)) return res.status(401).send("Order must be of age 18 or above");

   const order = { id: orders.length + 1, name: name, phone: phone, age: age };
   orders.push(order);

   res.status(201).send(order);
});

router.delete("/:id", (req: Request, res: Response) => {
   const id = req.params.id;
   if (!id) return res.status(401).send("Invalid request");

   const order = orders.find((u) => u.id === parseInt(id));
   if (!order) return res.status(404).send("Order not found");

   const index = orders.indexOf(order);
   orders.splice(index, index + 1);

   console.log(JSON.stringify(order));

   res.send(order);
});

export default router;
