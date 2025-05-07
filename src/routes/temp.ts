import { Router } from 'express';
import TempController from '../controllers/TempController';
import databaseInstance from '../config/Database';
import TempService from '../services/TempService';

export const initializeRouter = async(customController?: TempController) => {
    const router = Router();
    const controller = customController ?? await createDefaultController();

    console.log("router initialized.");
    return router;
}

async function createDefaultController(): Promise<TempController> {
   const pool = await databaseInstance.getPool()
    const controller = new TempController(
        new TempService(pool)
    );

    return controller;
}