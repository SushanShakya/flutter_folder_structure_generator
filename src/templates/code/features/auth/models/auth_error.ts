export let auth_error = `import 'package:equatable/equatable.dart';

class AuthError extends Equatable {
  final String title;
  final String text;

  const AuthError({
    this.title = 'Error',
    required this.text,
  });

  @override
  List<Object> get props => [title, text];
}
`
