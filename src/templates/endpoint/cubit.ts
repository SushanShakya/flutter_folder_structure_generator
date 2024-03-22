import { TemplateMetadata } from "../../types/metadata"

export function generateCubit(metadata: TemplateMetadata): string {


  const { interfaceFileName, endpoint, param, generateParamCode, generateResponseCode, paramFileName, responseFileName } = metadata;
  const { className, fnName, returnType } = endpoint;
  const paramImport = generateParamCode ? `import '../../data/models/${paramFileName}';` : "";
  const responseImport = generateResponseCode ? `import '../../data/models/${responseFileName}';` : "";

  let cubitTemplate = `
import 'package:warped_bloc/warped_bloc.dart';
import '../../data/repo/interface/${interfaceFileName}';
${paramImport}
${responseImport}

class ${className}Loaded extends DataState<${returnType}> {
  const ${className}Loaded({required super.data});
}

class ${className}Cubit extends AsyncCubit {
  final I${className}Repo repo;
  ${className}Cubit({
    required this.repo,
  });

  ${fnName}(${param}) {
    handleDefaultStates(() async {
      final data = await repo.${fnName}(${param.length === 0 ? "" : "param"});
      emit(${className}Loaded(data: data));
    });
  }
}
`
  return cubitTemplate
}