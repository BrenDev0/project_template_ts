import { Pool } from "pg";
import BaseQueries from "../class/BaseQueries";

export default class TempService extends BaseQueries {
    private cols: string[];

    constructor(pool: Pool) {
        super(pool, "");
        this.cols = [];
    }

    async create(): Promise<any> {
        try {
            
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }

    async read(): Promise<any> {
        try {
            
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }

    async update(): Promise<any> {
        try {
            
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }

    async delete(): Promise<any> {
        try {
            
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }
}