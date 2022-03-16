export let tab_navigator = `import 'package:flutter/material.dart';
import '../models/nav_item.dart';

class TabNavigator extends StatefulWidget {
  final GlobalKey<NavigatorState> navigatorKey;
  final GlobalKey<ScaffoldState>? scaffoldKey;
  final String currentPage;

  const TabNavigator({
    Key? key,
    required this.navigatorKey,
    this.scaffoldKey,
    required this.currentPage,
  }) : super(key: key);

  @override
  _TabNavigatorState createState() => _TabNavigatorState();
}

class _TabNavigatorState extends State<TabNavigator> {
  late TextEditingController searchController;

  @override
  void initState() {
    super.initState();
    searchController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    Widget child;

    switch (widget.currentPage) {
      case HOME:
        child = Scaffold(); 
        break;
      // Continue likewise
      default:
        child = Scaffold();
    }

    return Navigator(
      key: widget.navigatorKey,
      onGenerateRoute: (routeSetting) {
        return MaterialPageRoute(
          builder: (context) => child,
        );
      },
    );
  }
}
`