export function generateInterface({
  className,
  fnName,
}: {
  className: string,
  fnName: string,
}): string {
  let interfaceTemplate = `
abstract interface class I${className}Repo {
  Future ${fnName}();
}
`
  return interfaceTemplate;
}
