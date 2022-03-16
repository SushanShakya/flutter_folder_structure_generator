export let password_field = `import 'package:flutter/material.dart';
import '../utils/validator.dart';

class PasswordField extends StatefulWidget {
  final TextEditingController? controller;
  final FocusNode? node;
  final void Function()? onEditingComplete;

  const PasswordField({
    Key? key,
    this.controller,
    this.node,
    this.onEditingComplete,
  }) : super(key: key);
  @override
  _PasswordFieldState createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  late bool obscure;

  @override
  void initState() {
    super.initState();
    obscure = true;
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: widget.controller,
      focusNode: widget.node,
      obscureText: obscure,
      validator: Validator.validatePassword,
      decoration: InputDecoration(
          labelText: "Password",
          suffixIcon: IconButton(
              icon: Icon(!obscure ? Icons.visibility : Icons.visibility_off),
              onPressed: () {
                setState(() {
                  obscure = !obscure;
                });
              })),
      onEditingComplete: widget.onEditingComplete,
    );
  }
}
`