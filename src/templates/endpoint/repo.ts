import { TemplateMetadata } from "../../types/metadata";

const extractListType = (returnType: string) => {
  let interim = returnType.replace("List<", "");
  return interim.substring(0, interim.length - 1);
}

const generateReturnDefinition = (returnType: string): string => {
  let returnDefinition = "data";

  if (returnType.startsWith("List<")) {
    let listType = extractListType(returnType);
    returnDefinition = `List<${listType}>.generate(data.map((e) => ${listType}.fromMap(e)))`;
  }

  return returnDefinition;
}

export function generateRepo(metadata: TemplateMetadata): string {

  let param = metadata.endpoint.paramType ? `${metadata.endpoint.paramType} param` : "";
  let returnDefinition = generateReturnDefinition(metadata.endpoint.returnType);
  const { generateParamCode, generateResponseCode, paramFileName, responseFileName, injectable } = metadata;

  const paramImport = generateParamCode ? `import '../models/${paramFileName}';` : "";
  const responseImport = generateResponseCode ? `import '../models/${responseFileName}';` : "";


  let repoTemplate = `
import 'package:dio/dio.dart';
import './interface/${metadata.interfaceFileName}';
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
    final res = await dio.get("${metadata.endpoint.url}");
    final data = res.data;
    return ${returnDefinition};
  }
}
`
  return repoTemplate;
}
