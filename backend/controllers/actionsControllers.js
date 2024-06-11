import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Actions from "../models/actionsModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

//@desc     Get all actions
//route     GET /api/actions/
//@access   Public
const getActions = asyncHandler(async (req, res) => {
    const actions = await Actions.find()
        .populate("product", "name")
        .populate("user", "name");

    res.status(200).json(actions);
});


//@desc     Create action
//route     POST /api/actions/
//@access   Public
const createAction = asyncHandler(async (req, res) => {
    const [name, product, user] = req.body;


    const userId = await User.findOne({ name: createdBy });
    if (!userName) {
        return res.status(400).json({ message: "User not found" });
    }

    const productId = await Product.findOne({ name: createdBy });
    if (!userName) {
        return res.status(400).json({ message: "User not found" });
    }

    const action = new Actions({
        name,
        product,
        userId
    })

    const savedAction = await action.save();
    res.status(201).json(savedAction);
});


export { getActions, createAction };