import shortUrl from "../models/shortUrl.model.js";
import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const findUserByEmailAndPassword = async (email) => {
    return await User.findOne({ email }).select("+password");
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

export const createUser = async (name,email,password) => {
    const newuser = await User.create({name,email,password});
    await newuser.save();
    return newuser
};

export const getAllUserUrls = async (userId) => {
    return await shortUrl.find({ user: userId })
};