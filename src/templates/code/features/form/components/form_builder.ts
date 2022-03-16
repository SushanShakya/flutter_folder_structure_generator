export let form_builder = `import 'package:flutter/material.dart';
import '../models/form_item.dart';
import './password_field.dart';

class FormBuilder extends StatelessWidget {
  final List<FormItem> formItems;

  final GlobalKey<FormState>? formKey;
  final bool removeLastPadding;

  const FormBuilder({
    Key? key,
    required this.formItems,
    this.removeLastPadding = false,
    this.formKey,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
          children: List.generate(formItems.length, (index) {
        var e = formItems[index];

        var controller = e.controller;
        var nextNode = (index < formItems.length - 1)
            ? formItems[index + 1].focusNode
            : null;

        var currentNode = e.focusNode;

        var keyboardType = e.keyboardType;

        bool obscure = e.obscure;

        bool isLast = index == (formItems.length - 1);


        if (obscure) {
          return Padding(
            padding: (isLast && removeLastPadding)
                ? EdgeInsets.zero
                : const EdgeInsets.only(bottom: 15),
            child: PasswordField(
              controller: controller,
              node: currentNode,
              onEditingComplete: () {
                FocusScope.of(context).requestFocus(
                  (nextNode != null) ? nextNode : FocusNode(),
                );
              },
            ),
          );
        }

        return Padding(
          padding: (isLast && removeLastPadding)
              ? EdgeInsets.zero
              : const EdgeInsets.only(bottom: 15),
          child: IgnorePointer(
            ignoring: e.ignore ?? false,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(e.title),
                const SizedBox(height: 5),
                TextFormField(
                  controller: controller,
                  focusNode: currentNode,
                  onEditingComplete: () {
                    if (nextNode != null) {
                      FocusScope.of(context).requestFocus(nextNode);
                    } else {
                      FocusScope.of(context).unfocus();
                    }
                  },
                  style: TextStyle(
                    color: (e.ignore ?? false) ? Colors.grey : Colors.black,
                  ),
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 10),
                    isDense: true,
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(6)),
                    hintText: e.hint,
                  ),
                ),
              ],
            ),
          ),
        );
      })),
    );
  }
}
`