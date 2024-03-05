export function generateCubit({
  className,
  fnName,
  interfaceFileName,
}: {
  className: string,
  fnName: string,
  interfaceFileName: string,
}): string {
  let cubitTemplate = `
import 'package:warped_bloc/warped_bloc.dart';
import '${interfaceFileName}';

class ${className}Loaded extends DataState {
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