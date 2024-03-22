export type EndpointMetadata = {
    url: string,
    className: string,
    fnName: string,
    paramType?: string,
    returnType: string
}

export type TemplateMetadata = {
    endpoint: EndpointMetadata,
    interfaceFileName: string
}