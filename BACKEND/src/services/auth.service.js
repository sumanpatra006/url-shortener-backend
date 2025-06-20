import { createUser, findUserByEmail, findUserByEmailAndPassword } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserService = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists");
    const newUser = await createUser(name,email,password);
    // console.log("pass 2");
    // console.log(newUser);
    const token = await signToken({id : newUser._id})
    // console.log("pass 3",token);
    return {token,newUser}
};

export const loginUserService = async (email,password) => {
    const user = await findUserByEmailAndPassword(email)
    if(!user) throw new Error("User not found");

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) throw new Error("Invalid password");
    const token = await signToken({id : user._id})
    console.log("token",token);
    return {token,user}
};