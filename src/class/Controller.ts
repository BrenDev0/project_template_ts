import bcrypt from 'bcrypt';
import EncryptionService from '../services/EncryptionService';
import WebtokenService from '../services/WebtokenService';

export default class Controller {
    protected encryptionService: EncryptionService;
    protected webtokenService: WebtokenService;
    protected errorMessage = "Uable to process request at this time.";
    protected missingData = "All fields required."
    protected notFound = "Resource not found.";
    protected invalidId = "Invalid id.";

    constructor() {
        this.encryptionService = new EncryptionService();
        this.webtokenService = new WebtokenService();
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async comparePassword(password: string, hash:string): Promise<boolean> {
        try {
            const results = await bcrypt.compare(password, hash);
            
            return results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}