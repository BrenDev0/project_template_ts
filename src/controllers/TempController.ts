import { Request, Response } from "express";
import Controller from "../class/Controller";
import TempService from "../services/TempService";

export default class TempController extends Controller { 
    private tempService: TempService;   
    constructor(tempService: TempService) {
        super();
        this.tempService = tempService
    };

    async createRequest(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            console.log("error");
            res.status(500).json({ message: this.errorMessage });
        }
    }

    async readRequest(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            console.log("error");
            res.status(500).json({ message: this.errorMessage });
        }
    }

    async resourceRequest(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            console.log("error");
            res.status(500).json({ message: this.errorMessage });
        }
    }

    async collectionRequest(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            console.log("error");
            res.status(500).json({ message: this.errorMessage });
        }
    }

    async updateRequest(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            console.log("error");
            res.status(500).json({ message: this.errorMessage });
        }
    }

    async deleteRequest(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            console.log("error");
            res.status(500).json({ message: this.errorMessage });
        }
    }
}