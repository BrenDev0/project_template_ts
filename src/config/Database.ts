import { Pool } from 'pg';

class Database {
  private pool: Pool | null = null;
  private initPromise: Promise<void> | null = null;
  private static instance: Database;
  private isConnected: boolean // To track connection status

  private constructor() {
    this.isConnected = false;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async withTimeout<T>(promise: Promise<T>, timeout = 10000): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('Operation timed out')), timeout)
      ),
    ]);
  }

  public async init(): Promise<void> {
    if (this.initPromise !== null) {
      return this.initPromise;
    }

    console.log('Initializing Database...');

    this.initPromise = (async () => {
      try {      
        // Connect to the database
        this.pool = new Pool({
          host: process.env.PGHOST,
          user: process.env.PGUSER,
          password: process.env.PGPASSWORD,
          database: process.env.PGDATABASE,
          port: 5432,
          ssl: {
            rejectUnauthorized: false,
          }
        });

        // Simple test query to confirm connection 10 seconds timeout
        await this.withTimeout(this.pool.query('SELECT 1'));
        this.isConnected = true;
        
        console.log("Database Connected")
        return;
      } catch (err) {
        console.error('Error initializing the app:', err);
        this.initPromise = null;
        throw err;
      } finally {
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }

  // Get the pool instance or reconnect if needed
  public async getPool(): Promise<Pool> {
   try {
    if (!this.pool || !this.isConnected) {
     this.initPromise === null && console.log('Reconnecting to the database...');
      await this.init();
    }
    return this.pool as Pool;
   } catch (error) {
    console.log(error);
    throw error;
   }
  }

  // Actively check if the connection is alive
  public async checkConnection(): Promise<boolean> {
    if (!this.pool) {
      this.isConnected = false;
      return false;
    }

    try {
      await this.withTimeout(this.pool.query('SELECT 1')); // Simple test query 10 sec timeout
      this.isConnected = true;
      return true;
    } catch (error) {
      console.error("Database connection lost:", error);
      this.isConnected = false;
      return false;
    }
  }
}

const databaseInstance = Database.getInstance();

export default databaseInstance;