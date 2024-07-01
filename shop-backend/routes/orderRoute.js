import express from "express";
import fetchUser from "../middleware/fetchUser.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router()

orderRouter.post('/placeorder',fetchUser,placeOrder)
orderRouter.post('/verify',fetchUser,verifyOrder)
orderRouter.post('/userorders',fetchUser,userOrders)
orderRouter.post('/listorders',listOrders)
orderRouter.post('/updatestatus',updateStatus)


export default orderRouter;