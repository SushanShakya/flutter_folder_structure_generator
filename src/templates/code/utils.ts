
export function getFirstLetterCapital(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getUpperCamelCase(snakeCase: string): string {
    let names = snakeCase.split("_");
    let capitalized = names.map((v, i) => {
        return getFirstLetterCapital(v);
    })
    return capitalized.join("")
}
export function getProperName(snakeCase: string): string {
    let names = snakeCase.split("_");
    let capitalized = names.map((v, i) => {
        return getFirstLetterCapital(v);
    })
    return capitalized.join(" ")
}

export function upperCamelToSnake(upperCamelCase: string): string {
    return (upperCamelCase.replace(/[A-Z]/g, (match) => "_" + match.toLowerCase())).slice(1);
}