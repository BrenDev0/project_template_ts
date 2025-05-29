import Container from './Container'
import databaseInstance from "../database/Database";
import ErrorHandler from '../errors/ErrorHandler';
// import MiddlewareService from '../middleware/MiddlewareService';
import EncryptionService from '../services/EncryptionService';
import { Pool } from 'pg';


export async function configureContainer(testPool?: Pool): Promise<void> {
    // pool //
    const pool =  testPool ?? await databaseInstance.getPool();
    Container.register<Pool>("Pool", pool);

    // Encryption //
    const encryptionService = new EncryptionService();
    Container.register<EncryptionService>("EncryptionService", encryptionService);
    
    // errors //
    const errorHandler = new ErrorHandler(pool)
    Container.register("ErrorHandler", errorHandler);

    //middleware //
    // const usersService = Container.resolve<UsersService>("UsersService");
    // const middlewareService = new MiddlewareService(usersService, errorHandler);
    // Container.register<MiddlewareService>("MiddlewareService", middlewareService);

 
}