import { Request, Response } from 'express';
import createApp from './app/createApp';
import swaggerUi from 'swagger-ui-express';
import ErrorHandler from './errors/ErrorHandler';
import MiddlewareService from './middleware/MiddlewareService';
import databaseInstance from './config/Database';
//import swaggerFile from './swagger/swagger.json';

const server = async() => {
   const app = createApp();
   const pool = await databaseInstance.getPool();
   const errorHandler = new ErrorHandler(pool);
   const middlewareService = new MiddlewareService();
   
    process.env.NODE_ENV !== 'production' && app.use('/docs/endpoints', swaggerUi.serve, swaggerUi.setup());

    app.use(middlewareService.verifyHMAC.bind(middlewareService))

    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found." });
    });

    app.use(middlewareService.handleErrors(errorHandler))

   const PORT = process.env.SERVER_PORT || 3000
   app.listen(PORT, () => {
       console.log("online");
   });
}

server();


