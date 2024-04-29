import { TemplateMetadata } from "../../types/metadata";
import { extractListType } from "../../utils/type_utils";

const generateReturnDefinition = (returnType: string): string => {
  let returnDefinition = "data";

  if (returnType.startsWith("List<")) {
    let listType = extractListType(returnType);
    returnDefinition = `List<${listType}>.from(data.map((e) => ${listType}.fromMap(e)))`;
  }

  return returnDefinition;
}

const generateBody = (url: string, returnType: string, returnDefinition: string): string => {
  if (returnType === 'void') {
    return `await dio.get("${url}");`
  }
  return `
    final res = await dio.get("${url}");
    final data = res.data;
    return ${returnDefinition};
  `;
}

export function generateRepo(metadata: TemplateMetadata): string {

  let param = metadata.endpoint.paramType ? `${metadata.endpoint.paramType} param` : "";
  let returnDefinition = generateReturnDefinition(metadata.endpoint.returnType);
  const { generateParamCode, generateResponseCode, paramFileName, responseFileName, injectable } = metadata;

  const paramImport = generateParamCode ? `import '../models/${paramFileName}';` : "";
  const responseImport = generateResponseCode ? `import '../models/${responseFileName}';` : "";

  const body = generateBody(metadata.endpoint.url, metadata.endpoint.returnType, returnDefinition);


  let repoTemplate = `
import 'package:dio/dio.dart';
import './interface/${metadata.interfaceFileName}';
${injectable ? "import 'package:injectable/injectable.dart';" : ""}
${paramImport}
${responseImport}

${injectable ? `@LazySingleton(as: I${metadata.endpoint.className}Repo)` : ""}
class ${metadata.endpoint.className}Repo implements I${metadata.endpoint.className}Repo {
  final Dio dio;

  ${metadata.endpoint.className}Repo({
    required this.dio,
  });

  @override
  Future<${metadata.endpoint.returnType}> ${metadata.endpoint.fnName}(${param}) async {
    ${body}
  }
}
`
  return repoTemplate;
}
