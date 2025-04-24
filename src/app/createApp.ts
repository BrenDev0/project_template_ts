import express from 'express'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { verifyHMAC } from '../middleware/verifyHMAC';

const createApp = () => {
    const app = express();

app.use(helmet());


    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 200, // Limit each IP to 200 requests per windowMs
        message: "Too many requests, please try again later.",
    });

    app.use(limiter);
    app.set('trust proxy', 1);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    
    // List of paths to skip HMAC for
    const hmacExcludedPaths = [
        '/instagram',
        '/messenger',
        '/whatsapp',
        '/twilio',
        '/oauth'
    ];
    
    // Apply HMAC conditionally
    if (process.env.NODE_ENV === 'production') {
    const secret = process.env.HMAC_SECRET;
    app.use((req, res, next) => {
            const shouldSkip = hmacExcludedPaths.some(path => req.path.startsWith(path));

            if (shouldSkip) {
                return next();
            }
            return verifyHMAC(secret as string)(req, res, next);
        });
    }

    return app;
}

export default createApp;

