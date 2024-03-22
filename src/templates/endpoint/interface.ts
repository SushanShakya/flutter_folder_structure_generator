import { TemplateMetadata } from "../../types/metadata";

export function generateInterface(metadata: TemplateMetadata): string {
  let param = metadata.endpoint.paramType ? `${metadata.endpoint.paramType} param` : "";

  const { generateParamCode, generateResponseCode, paramFileName, responseFileName } = metadata;

  const paramImport = generateParamCode ? `import '../../models/${paramFileName}';` : "";
  const responseImport = generateResponseCode ? `import '../../models/${responseFileName}';` : "";

  let interfaceTemplate = `
${paramImport}
${responseImport}

abstract interface class I${metadata.endpoint.className}Repo {
  Future<${metadata.endpoint.returnType}> ${metadata.endpoint.fnName}(${param});
}
`
  return interfaceTemplate;
}
