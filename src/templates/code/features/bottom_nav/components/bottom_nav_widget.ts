export let bottom_nav_widget = `import 'package:flutter/material.dart';
import '../models/nav_item.dart';

class BottomNavWidget extends StatelessWidget {
  final List<NavItem> items;
  final String current;
  final Function(int) onChange;

  const BottomNavWidget({
    Key? key,
    required this.items,
    required this.onChange,
    this.current = HOME,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) { 
    return Container(
      height: kToolbarHeight,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(16),
          topLeft: Radius.circular(16),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 4,
            spreadRadius: 2,
          ),
        ],
      ),
      child: Row(
        children: List.generate(
          items.length,
          (i) {
            var cur = items[i];
            bool active = cur.title == current;
            return Expanded(
              child: InkWell(
                onTap: () {
                  onChange(i);
                },
                child: Container(
                  width: double.infinity,
                  child: _NavItem(
                    icon: cur.icon,
                    active: active,
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final Icon icon;
  final bool active;

  const _NavItem({Key? key, required this.icon, this.active = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: const EdgeInsets.all(5),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: active ? Colors.black.withOpacity(0.07) : Colors.transparent,
          ),
          // duration: const Duration(milliseconds: 500),
          child: icon,
        ),
        const SizedBox(height: 3),
        Container(
          // duration: const Duration(milliseconds: 500),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: active ? Colors.black : Colors.transparent,
          ),
          height: 5,
          width: 5,
        ),
      ],
    );
  }
}
`