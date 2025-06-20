import { cookieOptions } from "../config/config.js";
import { loginUserService, registerUserService } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const registerUser = wrapAsync(async (req, res, next) => {
    const {name,email,password} = req.body
    console.log("pass 1");
    
    const {token,user} = await registerUserService(name,email,password);
    req.user = user;
    res.cookie("accessToken",token,cookieOptions)
    res.status(200).json({user:user,"message":"user creation success"});
});

export const loginUser = wrapAsync(async (req, res, next) => {
    const {email,password} = req.body
    const {token,user} = await loginUserService(email,password);
    console.log("token",token);
    req.user = user;
    res.cookie("accessToken",token,cookieOptions)
    res.status(200).json({user:user,"message":"login success"});
});

export const logoutUser = wrapAsync(async (req, res, next) => {
    res.clearCookie("accessToken",cookieOptions);
    res.status(200).json("logout success");
});

export const getUser = wrapAsync(async (req, res, next) => {
    res.status(200).json(req.user);
});