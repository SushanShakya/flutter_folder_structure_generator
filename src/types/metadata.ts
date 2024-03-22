export type EndpointMetadata = {
    url: string,
    className: string,
    fnName: string,
    paramType?: string,
    returnType: string
}

export type TemplateMetadata = {
    endpoint: EndpointMetadata,
    param: string,
    interfaceFileName: string,
    paramFileName: string,
    responseFileName: string,
    generateParamCode: boolean,
    generateResponseCode: boolean,
    injectable: boolean,
}