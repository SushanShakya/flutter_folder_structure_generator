import { isNil } from "lodash";
import { InputBoxOptions, Uri, window } from "vscode";
import { generateCubit } from "../templates/endpoint/cubit";
import { generateRepo } from "../templates/endpoint/repo";
import { generateInterface } from "../templates/endpoint/interface";
import { getFirstLetterCapital, upperCamelToSnake } from "../templates/code/utils";
import { createDirectory, createFile } from "../utils/utils";
import path from "path";
import { EndpointMetadata, TemplateMetadata } from "../types/metadata";

type EndpointTemplate = {
    cubit: string,
    interfaceStr: string,
    repo: string
}



const generateTemplate = (metadata: TemplateMetadata): EndpointTemplate => {
    let cubit = generateCubit(metadata);
    let repo = generateRepo(metadata);
    let interfaceStr = generateInterface(metadata);
    return {
        cubit,
        interfaceStr,
        repo
    }
}

const promptName = async (options: InputBoxOptions): Promise<string | undefined> => {
    let name = await window.showInputBox(options)
    if (isNil(name) || name.trim() === "") {
        window.showErrorMessage("The name must not be empty");
        return;
    }
    return name;
}



const handlePrompts = async (): Promise<EndpointMetadata | undefined> => {

    let url = await promptName({
        prompt: "Endpoint Url",
        placeHolder: "Defaults to /",
    });

    let fnName = await promptName({
        prompt: "Function Name",
        placeHolder: "In Lower Camel Case",
    });
    if (!fnName) return;

    let className = getFirstLetterCapital(fnName);

    let paramType = await window.showInputBox({
        prompt: "Param Type",
        placeHolder: "In Upper Camel Case (Optional)",
    });

    let returnType = await promptName({
        prompt: "Return Type",
        placeHolder: "In Upper Camel Case",
    });
    if (!returnType) return;

    return {
        url: url ?? '/',
        className, fnName, paramType, returnType
    }
}

export const generateEndpointCode = async (uri: Uri) => {
    if (typeof uri === 'undefined') {
        window.showErrorMessage("Please use command from explorer !");
        return;
    }
    let dirPath = uri.fsPath;

    let prompts = await handlePrompts();
    if (!prompts) return;
    const {
        className,
    } = prompts;

    let classNameInSnake = upperCamelToSnake(className);
    let cubitPath = path.join(path.join(dirPath, "gui"), "presenters");
    let interfacePath = path.join(path.join(path.join(dirPath, "data"), "repo"), "interface");
    let repoPath = path.join(path.join(dirPath, "data"), "repo");

    let cubitFile = `${classNameInSnake}_cubit.dart`;
    let interfaceFile = `i${classNameInSnake}_repo.dart`;
    let repoFile = `${classNameInSnake}_repo.dart`;

    let metadata = { endpoint: prompts, interfaceFileName: interfaceFile };

    let template = generateTemplate(metadata);

    try {
        createDirectory(cubitPath);
        createDirectory(interfacePath);
        createDirectory(repoPath);
        createFile(path.join(cubitPath, cubitFile), template.cubit);
        createFile(path.join(interfacePath, interfaceFile), template.interfaceStr);
        createFile(path.join(repoPath, repoFile), template.repo);
    } catch (e) {
        console.log('---- Error while trying to create file');
        console.log(e);
        window.showErrorMessage("Failed to generate code");
        return;
    }
}