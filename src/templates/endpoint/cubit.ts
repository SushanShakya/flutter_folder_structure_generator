import { TemplateMetadata } from "../../types/metadata";

export function generateCubit(metadata: TemplateMetadata): string {


  const { interfaceFileName, endpoint, param, generateParamCode, generateResponseCode, paramFileName, responseFileName, injectable } = metadata;
  const { className, fnName, returnType: rawReturnType } = endpoint;
  const paramImport = generateParamCode ? `import '../../data/models/${paramFileName}';` : "";
  const responseImport = generateResponseCode ? `import '../../data/models/${responseFileName}';` : "";

  const returnType = rawReturnType === 'void' ? "String" : rawReturnType;

  const body = rawReturnType === 'void' ?
    `await repo.${fnName}(${param.length === 0 ? "" : "param"});
      emit(${className}Loaded(data: "Success"));`
    : `final data = await repo.${fnName}(${param.length === 0 ? "" : "param"});
        emit(${className}Loaded(data: data));`

  let cubitTemplate = `
import 'package:warped_bloc/warped_bloc.dart';
import '../../data/repo/interface/${interfaceFileName}';
${injectable ? "import 'package:injectable/injectable.dart';" : ""}

${paramImport}
${responseImport}

class ${className}Loaded extends DataState<${returnType}> {
  const ${className}Loaded({required super.data});
}

${injectable ? "@injectable" : ""}
class ${className}Cubit extends AsyncCubit {
  final I${className}Repo repo;
  ${className}Cubit({
    required this.repo,
  });

  ${fnName}(${param}) {
    handleDefaultStates(() async {
      ${body}
    });
  }
}
`
  return cubitTemplate
}