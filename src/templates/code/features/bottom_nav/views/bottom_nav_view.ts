export let bottom_nav_view = `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../components/tab_navigator.dart';
import '../blocs/navigation/navigation_cubit.dart';
import '../models/nav_item.dart';
import '../components/bottom_nav_widget.dart';

class BottomNavView extends StatefulWidget {
  @override
  _BottomNavViewState createState() => _BottomNavViewState();
}

class _BottomNavViewState extends State<BottomNavView> {
  late Map<String, GlobalKey<NavigatorState>> _navigatorKeys;

  late NavigationCubit<NavItem> bottomNavCubit;

  @override
  void initState() {
    super.initState();
    _navigatorKeys = {
      HOME: GlobalKey<NavigatorState>(),
      FAV: GlobalKey<NavigatorState>(),
      CART: GlobalKey<NavigatorState>(),
      MORE: GlobalKey<NavigatorState>(),
    };
    bottomNavCubit = context.read<NavigationCubit<NavItem>>()
      ..changeView(navItems[0]);
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<NavigationCubit<NavItem>, NavItem>(
      bloc: bottomNavCubit,
      builder: (BuildContext context, state) => WillPopScope(
        onWillPop: () async {
          final isFirstRouteInCurrentTab =
              !(await (_navigatorKeys[state]!.currentState)!.maybePop());

          if (isFirstRouteInCurrentTab) {
            if (state.title != HOME) {
              selectTab(state, navItems[0]);
              return false;
            }
          }
          return isFirstRouteInCurrentTab;
        },
        child: Scaffold(
          body: Stack(
            children: navItems
                .map((e) => _buildOffstageNavigator(state.title, e.title))
                .toList(),
          ),
          bottomNavigationBar: BottomNavWidget(
            items: navItems,
            current: state.title,
            onChange: (v) {
              selectTab(state, navItems[v]);
            },
          ),
        ),
      ),
    );
  }

  Widget _buildOffstageNavigator(String state, String tabItem) {
    return Offstage(
      offstage: state != tabItem,
      child: TabNavigator(
        navigatorKey: _navigatorKeys[tabItem]!,
        currentPage: tabItem,
      ),
    );
  }

  void selectTab(NavItem state, NavItem item) {
    if (item == state) {
      _navigatorKeys[item.title]!
          .currentState!
          .popUntil((route) => route.isFirst);
    } else {
      bottomNavCubit.changeView(item);
    }
  }
}
`