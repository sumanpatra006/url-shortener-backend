import {nanoid} from "nanoid"
import { cookieOptions } from "../config/config.js";
import jsonWebToken from "jsonwebtoken";

export const generateNanoId = (length)=>{
    return nanoid(length)
} 

export const signToken = async (payload) => {
    return jsonWebToken.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
}

export const verifyToken = async (token) => {
    return jsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
}