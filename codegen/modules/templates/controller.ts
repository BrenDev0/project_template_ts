export function generateController(moduleName: string): string {
const pascal = moduleName[0].toUpperCase() + moduleName.slice(1);
const camel = moduleName[0].toLowerCase() + moduleName.slice(1);
const singular = moduleName.endsWith('s') ? moduleName.slice(0, -1) : moduleName;
const singularPascal = singular[0].toUpperCase() + singular.slice(1);

  return `
import { Request, Response } from "express";
import HttpService from "../../core/services/HttpService"
import { BadRequestError, NotFoundError } from "../../core/errors/errors";
import ${pascal}Service from "./${pascal}Service";
import { ${singularPascal}Data } from "./${moduleName}.interface";

export default class ${pascal}Controller { 
  private ${camel}Service: ${pascal}Service;  
  private block = "${moduleName}.controller"; 
  private httpService: HttpService;

  constructor(${camel}Service: ${pascal}Service, httpService: HttpService) {
    this.${camel}Service = ${camel}Service;
    this.httpService = httpService;
  }

  async createRequest(req: Request, res: Response): Promise<void> {
    const block = \`\${this.block}.createRequest\`;
    try {
      const requiredFields = [""];


      const ${singular}Data = {
    
      };

      await this.${camel}Service.create(${singular}Data);

      res.status(200).json({ message: " added." });
    } catch (error) {
      throw error;
    }
  }

  async resourceRequest(req: Request, res: Response): Promise<void> {
    const block = \`\${this.block}.resourceRequest\`;
    try {
      
    } catch (error) {
      throw error;
    }
  }

  async updateRequest(req: Request, res: Response): Promise<void> {
    const block = \`\${this.block}.updateRequest\`;
    try { 
     const resource = await this.${camel}Service.resource(user.user_id);
      if (!resource) {
        throw new NotFoundError(undefined, {
          block: \`\${block}.notFound\`,
        });
      }
      const allowedChanges = [""];

      const filteredChanges = super.filterUpdateRequest<${pascal}Data>(allowedChanges, req.body, block);

      await this.${camel}Service.update(filteredChanges);

      res.status(200).json({ message: "folder updated" });
    } catch (error) {
      throw error;
    }
  }

  async deleteRequest(req: Request, res: Response): Promise<void> {
    const block = \`\${this.block}.deleteRequest\`;
    try {
     
    } catch (error) {
      throw error;
    }
  }
}
  `.trim();
}
