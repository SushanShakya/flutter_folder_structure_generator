export let nav_item = `import 'package:flutter/material.dart';

const HOME = 'Home';
const FAV = 'Favourites';
const CART = 'Cart';
const MORE = 'More';

class NavItem {
  String title;
  late Icon icon;

  NavItem({required this.title, required IconData icon}) {
    this.icon = Icon(
      icon,
      size: 18.0,
      color: Colors.white,
    );
  }
}

List<NavItem> navItems = [
  NavItem(title: HOME, icon: Icons.home),
  NavItem(title: FAV, icon: Icons.favorite),
  NavItem(title: CART, icon: Icons.shopping_cart),
  NavItem(title: MORE, icon: Icons.more_horiz),
];

`