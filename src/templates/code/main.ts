import { getUpperCamelCase, getProperName } from "./utils";

export function getCleanedMain(appName: string): string {
    const upperCamel = getUpperCamelCase(appName)
    const properName = getProperName(appName)
    return `import 'package:flutter/material.dart';

void main() => runApp(${upperCamel}());

class ${upperCamel} extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
    return MaterialApp(
        title: '${properName}',
        theme: ThemeData(
            appBarTheme: const AppBarTheme(elevation: 0),
        ),
        home: Home(),
    );
    }
}
`;
}
