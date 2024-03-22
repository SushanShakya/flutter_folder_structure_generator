import { TemplateMetadata } from "../../types/metadata"

export function generateCubit(metadata: TemplateMetadata): string {

  const { interfaceFileName, endpoint } = metadata;
  const { className, fnName, returnType } = endpoint;

  let cubitTemplate = `
import 'package:warped_bloc/warped_bloc.dart';
import '../../data/repo/interface/${interfaceFileName}';

class ${className}Loaded extends DataState<${returnType}> {
  const ${className}Loaded({required super.data});
}

class ${className}Cubit extends AsyncCubit {
  final I${className}Repo repo;
  ${className}Cubit({
    required this.repo,
  });

  ${fnName}() {
    handleDefaultStates(() async {
      final data = await repo.${fnName}();
      emit(${className}Loaded(data: data));
    });
  }
}
`
  return cubitTemplate
}