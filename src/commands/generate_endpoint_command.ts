import { isNil } from "lodash";
import { InputBoxOptions, Uri, window } from "vscode";
import { generateCubit } from "../templates/endpoint/cubit";
import { generateRepo } from "../templates/endpoint/repo";
import { generateInterface } from "../templates/endpoint/interface";
import { upperCamelToSnake } from "../templates/code/utils";
import { createDirectory, createFile } from "../utils/utils";
import path from "path";

type EndpointTemplate = {
    cubit: string,
    interfaceStr: string,
    repo: string
}

const generateTemplate = ({
    className,
    fnName,
    interfaceFileName,
}: {
    className: string,
    fnName: string,
    interfaceFileName: string,
}): EndpointTemplate => {
    let cubit = generateCubit({ className, fnName, interfaceFileName });
    let repo = generateRepo({ className, fnName, interfaceFileName });
    let interfaceStr = generateInterface({ className, fnName });
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

export const generateEndpointCode = async (uri: Uri) => {
    if (typeof uri === 'undefined') {
        window.showErrorMessage("Please use command from explorer !");
        return;
    }
    let dirPath = uri.fsPath;

    let className = await promptName({
        prompt: "Class Name",
        placeHolder: "In Upper Camel Case",
    });
    if (!className) return;

    let fnName = await promptName({
        prompt: "Function Name",
        placeHolder: "In Lower Camel Case",
    });
    if (!fnName) return;

    let classNameInSnake = upperCamelToSnake(className);
    let cubitPath = path.join(path.join(dirPath, "gui"), "presenters");
    let interfacePath = path.join(path.join(path.join(dirPath, "data"), "repo"), "interface");
    let repoPath = path.join(path.join(dirPath, "data"), "repo");

    let cubitFile = `${classNameInSnake}_cubit.dart`;
    let interfaceFile = `i${classNameInSnake}_repo.dart`;
    let repoFile = `${classNameInSnake}_repo.dart`;

    let template = generateTemplate({ className, fnName, interfaceFileName: interfaceFile });

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
    }
}