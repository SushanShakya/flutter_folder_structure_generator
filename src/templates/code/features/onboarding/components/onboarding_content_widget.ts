export let onboarding_content_widget = `import 'package:flutter/material.dart';
import '../models/onboarding_content.dart';

class OnboardingContentWidget extends StatelessWidget {
  final OnboardingContent content;
  final bool isLast;

  const OnboardingContentWidget({
    Key? key,
    required this.content,
    required this.isLast,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Padding(
            padding: (isLast)
                ? const EdgeInsets.symmetric(vertical: 15)
                : EdgeInsets.zero,
            child: Image.asset(content.image),
          ),
        ),
        Text(
          content.title,
          style: const TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 34,
            color: Color(0xff2c2c2c),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Text(
            content.subtitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 17,
              color: Color(0xff414141),
            ),
          ),
        )
      ],
    );
  }
}
`