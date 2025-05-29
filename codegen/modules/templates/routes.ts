export function generateRoutes(moduleName: string): string {
  const pascal = moduleName[0].toUpperCase() + moduleName.slice(1);
  const camel = moduleName[0].toLowerCase() + moduleName.slice(1);

  return `import { Router } from 'express';
import Container from '../../core/dependencies/Container';
import MiddlewareService from '../../core/middleware/MiddlewareService';
import ${pascal}Controller from './${pascal}Controller';

export const initialize${pascal}Router = (customController?: ${pascal}Controller) => {
    const router = Router();
    const secureRouter = Router();
    const middlewareService = Container.resolve<MiddlewareService>("MiddlewareService");
    const controller = customController ?? Container.resolve<${pascal}Controller>("${pascal}Controller");

    secureRouter.use(middlewareService.auth.bind(middlewareService));

     /*
        #swagger.tags = ['${pascal}']
        #swagger.path =  '/${camel}/secure'
        #swagger.security = [{ "bearerAuth": [] }] 
        #swagger.description = 'Update ${camel}'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/update${pascal}" }
                }
            }
        }
        */

    // protected Routes //


  

    // mounts //

    router.use("/secure", secureRouter);

    console.log("${pascal} router initialized.");
    return router;
}
`;
}
