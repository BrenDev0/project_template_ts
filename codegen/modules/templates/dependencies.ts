export function generateDependencies(moduleName: string): string {
const pascal = moduleName[0].toUpperCase() + moduleName.slice(1);
const singular = moduleName.endsWith('s') ? moduleName.slice(0, -1) : moduleName;
const singularPascal = singular[0].toUpperCase() + singular.slice(1);
  // Example: "folders" → "Folders"
  // Use PascalCase + suffixes exactly as in your example

  return `import { Pool } from "pg";
import BaseRepository from "../../core/repository/BaseRepository";
import { ${singularPascal} } from "./${moduleName}.interface";
import ${pascal}Service from "./${pascal}Service";
import ${pascal}Controller from "./${pascal}Controller";
import Container from "../../core/dependencies/Container";

export function configure${pascal}Dependencies(pool: Pool): void {
    const repository = new BaseRepository<${pascal}>(pool, "${moduleName}");
    const service = new ${pascal}Service(repository);
    const controller = new ${pascal}Controller(service);

    Container.register<${pascal}Service>("${pascal}Service", service);
    Container.register<${pascal}Controller>("${pascal}Controller", controller);
    return;
}
`;
}
