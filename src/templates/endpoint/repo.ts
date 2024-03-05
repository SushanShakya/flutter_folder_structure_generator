export function generateRepo({
  className,
  fnName,
  interfaceFileName
}: {
  className: string,
  fnName: string,
  interfaceFileName: string,
}): string {
  let repoTemplate = `
import 'package:dio/dio.dart';
import './${interfaceFileName}';

class ${className}Repo implements I${className}Repo {
  final Dio dio;

  ${className}Repo({
    required this.dio,
  });

  @override
  Future ${fnName}() async {
    final data = await dio.get("");
  }
}
`
  return repoTemplate;
}
