import fs from 'fs';
import path from 'path';
import { generateController } from './templates/controller';
import { generateDependencies } from './templates/dependencies';
import { generateService } from './templates/service';
import { generateEmptyInterfaces } from './templates/interface';
import { generateRoutes } from './templates/routes';

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('❌ Please provide a module name.');
  process.exit(1);
}

const Pascal = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const Camel = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);
const basePath = path.join(__dirname, '../../src/modules', moduleName);

if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

const files = [
  {
    fileName: `${Pascal}Service.ts`,
    content: generateService(moduleName),
  },
  {
    fileName: `${Pascal}Controller.ts`,
    content: generateController(moduleName),
  },
  {
    fileName: `${Camel}.interface.ts`,
    content: generateEmptyInterfaces(moduleName),
  },
  {
    fileName: `${Camel}.dependencies.ts`,
    content: generateDependencies(moduleName),
  },
  {
    fileName: `${Camel}.routes.ts`,
    content: generateRoutes(moduleName),
  },
];

files.forEach(({ fileName, content }) => {
  const fullPath = path.join(basePath, fileName);
  fs.writeFileSync(fullPath, content.trim() + '\n');
  console.log(`✅ Created: ${fileName}`);
});
