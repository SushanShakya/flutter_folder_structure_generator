export let form_item = `import 'package:flutter/material.dart';
import '../utils/validator.dart';

class FormItem {
  String title;
  TextEditingController controller;
  FocusNode? focusNode;
  TextInputType? keyboardType;
  bool obscure;
  String? Function(String)? validator;
  int? maxLength;
  bool? ignore;
  Widget? prefixIcon;
  String? hint;

  FormItem({
    this.ignore,
    required this.title,
    this.hint,
    this.prefixIcon,
    required this.controller,
    this.maxLength,
    this.focusNode,
    String? Function(String?)? validator,
    TextInputType? keyboardType,
    this.obscure = false,
  }) {
    this.keyboardType = keyboardType ?? TextInputType.name;
    this.validator = validator ?? Validator.validateEmpty;
  }
}
`