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

function getFirstLetterCapital(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function getUpperCamelCase(snakeCase: string): string {
    let names = snakeCase.split("_");
    let capitalized = names.map((v, i) => {
        return getFirstLetterCapital(v);
    })
    return capitalized.join("")
}
function getProperName(snakeCase: string): string {
    let names = snakeCase.split("_");
    let capitalized = names.map((v, i) => {
        return getFirstLetterCapital(v);
    })
    return capitalized.join(" ")
}