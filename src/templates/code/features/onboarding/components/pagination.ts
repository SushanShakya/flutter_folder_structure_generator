export let pagination = `import 'package:flutter/material.dart';

class CustomPagination extends StatelessWidget {
  final int active;
  final int itemCount;

  const CustomPagination({
    Key? key,
    required this.active,
    required this.itemCount,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(
        itemCount,
        (index) => PaginationItem(
          active: index == active,
        ),
      ),
    );
  }
}

class PaginationItem extends StatefulWidget {
  final bool active;
  const PaginationItem({
    Key? key,
    required this.active,
  }) : super(key: key);

  @override
  _PaginationItemState createState() => _PaginationItemState();
}

class _PaginationItemState extends State<PaginationItem> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 5),
      height: 8.0,
      width: 8.0,
      decoration:
          widget.active ? activePaginationDecoration : paginationDecoration,
    );
  }
}

BoxDecoration paginationDecoration = BoxDecoration(
  shape: BoxShape.circle,
  color: const Color(0xffd1d1d1),
  border: Border.all(
    color: const Color(0xffd1d1d1),
  ),
);
const BoxDecoration activePaginationDecoration = BoxDecoration(
  shape: BoxShape.circle,
  color: Colors.blue,
);
` 