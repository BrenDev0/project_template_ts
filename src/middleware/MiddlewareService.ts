import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
import Controller from "../class/Controller";
import ErrorHandler from '../errors/ErrorHandler';
import AppError from '../class/AppError';
import { AuthenticationError, AuthorizationError, ENVVariableError } from "../errors/errors";

export default class MiddlewareService extends Controller {
    constructor() {
        super();
    }

    // auth(usersService: UserService) {
    //     return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    //         try {
    //             const token = req.headers.authorization?.split(" ")[1];
        
    //             if(!token) {
    //                 throw new AuthenticationError(undefined, {
    //                     headers: req.headers
    //                 });
    //             }
        
    //             const decodedToken = this.webtokenService.decodeToken(token);
                
    //             if(!decodedToken) {
    //                 throw new AuthenticationError("Invalid or expired token", {
    //                     token: decodedToken
    //                 });
    //             };
        
    //             if(!decodedToken.userId) {
    //                 throw new AuthorizationError("Forbidden", {
    //                     token: decodedToken
    //                 }); 
    //             };

    //             if(isNaN(Number(decodedToken.userId))) {
    //                 throw new AuthorizationError("Forbidden")
    //             }
                
    //             const user = await usersService.resource("user_id", decodedToken.userId);

    //             if(!user) {
    //                 throw new AuthorizationError("Forbidden")
    //             }
            
    //             (req as any).user = user;
    //             next();
    //         } catch (error) {
    //             next(error); 
    //         }
    //     }
    // }

    async verification(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.headers.authorization?.split(" ")[1];
    
            if(!token) {
               throw new AuthenticationError(undefined, {
                    headers: req.headers
                });
            }
    
            const decodedToken = this.webtokenService.decodeToken(token);
            
            if(!decodedToken) {
                throw new AuthenticationError("Invalid or expired token", {
                    token: decodedToken
                });
            };
    
            if(!decodedToken.verificationCode) {
                throw new AuthorizationError("Forbidden", {
                    token: decodedToken
                }); 
            };

            req.body.verificationCode = decodedToken.verificationCode;
    
            return next();
        } catch (error) {
            next(error);
        }
    }

    handleErrors(errorHandler: ErrorHandler) {
        return async(error: unknown, req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                await errorHandler.handleError(error);
        
                if (error instanceof AppError) {
                    res.status(error.statusCode).json({
                        success: false,
                        message: error.statusCode === 500 ? this.errorMessage : error.message,
                        //...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
                    });
                    return; 
                }
        
                res.status(500).json({
                    success: false,
                    message: this.errorMessage,
                    //...(process.env.NODE_ENV === 'development' ? { stack: (error as Error).stack } : {}),
                });
            } catch (loggingError) {
                console.error('Error handling failed:', loggingError);
                res.status(500).json({
                    success: false,
                    message: this.errorMessage,
                });
                return
            }
        };
    }

    async verifyHMAC(req: Request, res: Response, next: NextFunction): Promise<void> {
        if(!process.env.HMAC_SECRET) {
            throw new ENVVariableError("Missing HMAC_SECRET variable");
        }
        const secret = process.env.HMAC_SECRET ;
        const hmacExcludedPaths = [""];
        const allowedDrift = 60_000;

        const shouldSkip = hmacExcludedPaths.some(path => req.path.startsWith(path));
        
        if (shouldSkip) {
            return next();
        }
       
        const signature = req.headers['x-signature'] as string;
        const payload = req.headers['x-payload'] as string;
    
        if (!signature || !payload) {
            throw new AuthorizationError(undefined, {
                block: "HMAC verification",
                signature: signature || "**MISSING**",
                payload: payload || "**MISSING**"
            });
        }
    
        const timestamp = parseInt(payload);

        if (isNaN(timestamp) || Math.abs(Date.now() - timestamp) > allowedDrift) {
            throw new AuthorizationError('Invalid or expired payload timestamp')
        }
    
        const expected = crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
    
        if (signature !== expected) {
            throw new AuthorizationError(undefined, {
                block: "HMAC verification",
                signature: signature,
                expected: expected
            })
        }
    
        next();

    }
}