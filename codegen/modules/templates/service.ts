export function generateService(moduleName: string): string {
const singular = moduleName.endsWith('s') ? moduleName.slice(0, -1) : moduleName;
const pascal = singular[0].toUpperCase() + singular.slice(1);

return `import { ${pascal}, ${pascal}Data } from './${moduleName}.interface'
import BaseRepository from "../../core/repository/BaseRepository";
import { handleServiceError } from '../../core/errors/error.service';
import Container from '../../core/dependencies/Container';
import EncryptionService from '../../core/services/EncryptionService';

export default class ${pascal}Service {
    private repository: BaseRepository<${pascal}>;
    private block = "${moduleName}.service"
    constructor(repository: BaseRepository<${pascal}>) {
        this.repository = repository
    }

    async create(${moduleName}: ${pascal}Data): Promise<${pascal}> {
        const mapped${pascal} = this.mapToDb(${moduleName});
        try {
            return this.repository.create(mapped${pascal});
        } catch (error) {
            handleServiceError(error as Error, this.block, "create", mapped${pascal})
            throw error;
        }
    }

    async resource(): Promise<${pascal}Data | null> {
        try {
            const result = await this.repository.selectOne();
            if(!result) {
                return null
            }
            return this.mapFromDb(result)
        } catch (error) {
            handleServiceError(error as Error, this.block, "resource")
            throw error;
        }
    }

    async update(changes: ${pascal}Data): Promise<${pascal}> {
        const mappedChanges = this.mapToDb(changes);
        const cleanedChanges = Object.fromEntries(
            Object.entries(mappedChanges).filter(([_, value]) => value !== undefined)
        );
        try {
            return await this.repository.update();
        } catch (error) {
            handleServiceError(error as Error, this.block, "update", cleanedChanges)
            throw error;
        }
    }

    async delete(): Promise<${pascal}> {
        try {
            return await this.repository.delete() as ${pascal};
        } catch (error) {
            handleServiceError(error as Error, this.block, "delete")
            throw error;
        }
    }

    mapToDb(${moduleName}: ${pascal}Data): ${pascal} {
        const encryptionService = Container.resolve<EncryptionService>("EncryptionService");
        return {
           
        }
    }

    mapFromDb(${moduleName}: ${pascal}): ${pascal}Data {
        const encryptionService = Container.resolve<EncryptionService>("EncryptionService");
        return {
        
        }
    }
}
`;
}
