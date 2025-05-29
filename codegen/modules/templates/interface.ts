export function generateEmptyInterfaces(moduleName: string): string {
  const singular = moduleName.endsWith('s') ? moduleName.slice(0, -1) : moduleName;
  const pascal = singular[0].toUpperCase() + singular.slice(1);

  return `export interface ${pascal} {
  // Define your database interface fields here
}

export interface ${pascal}Data {
  // Define your data interface fields here
}
`;
}
