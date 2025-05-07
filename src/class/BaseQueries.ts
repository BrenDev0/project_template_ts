import { Pool, QueryResult } from "pg";

export default class BaseQueries {
    private pool: Pool;
    private table: string;

    constructor(pool: Pool, table:string) {
        this.pool = pool;
        this.table = table;
    }

    async insert(cols: string[], values: any[]): Promise<QueryResult> {
        try {
            const placeholders = cols.map((_, i) => `$${i + 1}`).join(", ")
            const sqlInsert =  `
                INSERT INTO ${this.table}
                (${cols.join(", ")})
                values (${placeholders})
                RETURNING *;
            `;

            const result = await this.pool.query(
                sqlInsert,
                values
            );

            return result.rows[0];
        } catch (error) {
            console.log("Error in basequery insert::: ", error);
            throw error;
        }
    }

    async Select(where: string, values: any[]): Promise<QueryResult[]> {
        try {
            const sqlSelect = `
                SELECT * FROM ${this.table} WHERE ${where};
            `;

            const result = await this.pool.query(
                sqlSelect,
                values
            );

            return result.rows; 
        } catch (error) {
            console.log("Error in basequery select:::", error);
            throw error;
        }
    }

    async update(data: Record<string, any>, where: string, indentifier: number | string): Promise<QueryResult> {
        try {
            const clauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}` );
            let values = Object.values(data);

            const sqlUpdate = `
                UPDATE ${this.table}
                SET ${clauses}
                WHERE ${where} = $${Object.keys(data).length + 1}
                RETURNING *;
            `;

            values.push(indentifier);

            const result = await this.pool.query(
                sqlUpdate,
                values
            );

            return result.rows[0];
        } catch (error) {
            console.log("Error in basequery update::: ", error);
            throw error;
        }
    }

    async delete(where: string, values: any[]): Promise<QueryResult> {
        try {
            const sqlDelete = `
                DELETE FROM ${this.table} 
                WHERE ${where} 
                RETURNING *;
            `;

            const result = await this.pool.query(
                sqlDelete,
                values
            );

            return result.rows[0];
        } catch (error) {
            console.log("Error in basequery delete::: ", error);
            throw error;
        }
    }
}