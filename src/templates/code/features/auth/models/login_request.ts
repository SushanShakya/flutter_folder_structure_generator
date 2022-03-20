export let login_request = `class LoginRequest {
  final String email;
  final String password;

  const LoginRequest(this.email, this.password);

  Map<String, dynamic> toMap() =>
      {'email': email.trim(), 'password': password.trim()};
}
`