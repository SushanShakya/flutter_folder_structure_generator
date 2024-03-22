import { TemplateMetadata } from "../../types/metadata";

export function generateInterface(metadata: TemplateMetadata): string {
  let param = metadata.endpoint.paramType ? `${metadata.endpoint.paramType} param` : "";
  let interfaceTemplate = `
abstract interface class I${metadata.endpoint.className}Repo {
  Future<${metadata.endpoint.returnType}> ${metadata.endpoint.fnName}(${param});
}
`
  return interfaceTemplate;
}
