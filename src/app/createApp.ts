import express from 'express'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors'

const createApp = () => {
    const app = express();

    const allowedOrigins = [
        "http://localhost:3000"
    ];
      
    app.use(cors({
        origin: allowedOrigins,
        credentials: true
    }));

    app.use(helmet());


    // const limiter = rateLimit({
    //     windowMs: 15 * 60 * 1000, // 15 minutes
    //     max: 200, // Limit each IP to 200 requests per windowMs
    //     message: "Too many requests, please try again later.",
    // });

    // app.use(limiter);
    app.set('trust proxy', 1);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
}

export default createApp;

