import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async(req,res,next) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({message:"Unauthorized token not exists"});
    try{
        const decoded = await verifyToken(token);
        const user = await findUserById(decoded.id);
        if(!user) return res.status(401).json({message:"Unauthorized user not found"});
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        
        return res.status(401).json({message:"Unauthorized"});
    }
}