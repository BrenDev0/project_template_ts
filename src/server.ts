import express, { Request, Response } from 'express';
import createApp from './app/createApp';
import swaggerUi from 'swagger-ui-express';
//import swaggerFile from './swagger/swagger.json';

const server = async() => {
   const app = createApp();


    process.env.NODE_ENV !== 'production' && app.use('/docs/endpoints', swaggerUi.serve, swaggerUi.setup());

    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found." });
    });


   const PORT = process.env.SERVER_PORT || 3000
   app.listen(PORT, () => {
       console.log("online");
   });
}

server();


