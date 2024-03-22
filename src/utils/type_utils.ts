export const isPrimitive = (type: string): boolean => {
    let primitives = ["String", "bool", "int", "double", "Map", "List", "num"]
    return primitives.reduce<boolean>((a, b) => a || type.startsWith(b), false);
}

export const extractListType = (returnType: string) => {
    let interim = returnType.replace("List<", "");
    return interim.substring(0, interim.length - 1);
}

