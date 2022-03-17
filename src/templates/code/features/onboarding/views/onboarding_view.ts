export let onboarding_view = `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/navigation/navigation_cubit.dart';
import '../components/onboarding_content_widget.dart';
import '../components/pagination.dart';
import '../models/onboarding_content.dart';

class OnboardingView extends StatefulWidget {
  @override
  State<OnboardingView> createState() => _OnboardingViewState();
}

class _OnboardingViewState extends State<OnboardingView> {
  late NavigationCubit<int> navC;

  late List<OnboardingContent> contents;

  @override
  void initState() {
    super.initState();
    contents = [
      OnboardingContent(
        title: "Hey There!",
        subtitle:
            "Book hotels, get awesome tours, adventures packages, and more.",
        image: "",
      ),
      OnboardingContent(
        title: "Travel Freely",
        subtitle: "Bibendum sit morbi dolor pharetra.Bibendum sit morbi dolor.",
        image: "",
      ),
      OnboardingContent(
        title: "Travel Freely",
        subtitle: "Bibendum sit morbi dolor pharetra.Bibendum sit morbi dolor.",
        image: "",
      ),
    ];
    navC = NavigationCubit(0);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                padEnds: false,
                itemCount: contents.length,
                onPageChanged: (int page) {
                  navC.changeView(page);
                },
                itemBuilder: (c, i) {
                  var cur = contents[i];
                  return OnboardingContentWidget(
                    content: cur,
                    isLast: i == (contents.length - 1),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: BlocBuilder<NavigationCubit<int>, int>(
                bloc: navC,
                builder: (context, state) {
                  return CustomPagination(
                    active: state,
                    itemCount: contents.length,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`