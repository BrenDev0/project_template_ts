import { Pool, QueryResult } from "pg";

export default class BaseQueries {
    private pool: Pool;
    private table: string;

    constructor(pool: Pool, table:string) {
        this.pool = pool;
        this.table = table;
    }

    async insertQuery(cols: string[], placeholders: any[], values: any[]): Promise<any> {
        try {
            const sqlInsert =  `
                INSERT INTO ${this.table}
                (${cols.join(", ")})
                values (${placeholders.join(", ")})
                RETURNING *;
            `;

            const result = await this.pool.query(
                sqlInsert,
                values
            );

            return result.rows
        } catch (error) {
            console.log("Error in basequery insert::: ", error);
            throw error;
        }
    }

    async selectQuery(whereStatement?: string, values: any[] = []): Promise<any[]> {
        try {
            const sqlSelect = `
                SELECT * FROM ${this.table}
                ${whereStatement ? `WHERE ${whereStatement}` : ''};
            `;

            const result = await this.pool.query(sqlSelect, values);

            return result.rows;
        } catch (error) {
            console.log("Error in basequery select:::", error);
            throw error;
        }
    }

    async updateQuery(data: Record<string, any>, whereStaement: string, values: any[]): Promise<any> {
        try {
            const clauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}` );
           
            const sqlUpdate = `
                UPDATE ${this.table}
                SET ${clauses}
                WHERE ${whereStaement}
                RETURNING *;
            `;

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

    async deleteQuery(whereStatment: string, values: any[]): Promise<any> {
        try {
            const sqlDelete = `
                DELETE FROM ${this.table} 
                WHERE ${whereStatment} 
                RETURNING *;
            `;

            const result = await this.pool.query(
                sqlDelete,
                values
            );

            return result.rows;
        } catch (error) {
            console.log("Error in basequery delete::: ", error);
            throw error;
        }
    }
}