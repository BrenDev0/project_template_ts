import { NextFunction, Request, Response } from "express";
import WebTokenService from "../services/WebtokenService";

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            res.status(401).json({"message": "Unauthorized"});
            return; 
        }

        const decodedToken = new WebTokenService().decodeToken(token);
        
        if(!decodedToken) {
            res.status(401).json({"message": "Unauthorized: Invalid or expired token"});
            return;
        }

        if(!decodedToken.verificationCode && !decodedToken.userId) {
            res.status(401).json({"message": "Unauthorized."});
            return; 
        }

        if(decodedToken.verificationCode){
            req.body.verificationCode = decodedToken.verificationCode;
            return next();
        } 
       
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": "Unable to process request at this time."});
        return; 
    }
}

export default auth;