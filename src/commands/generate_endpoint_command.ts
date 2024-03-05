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
    let full_path = uri.fsPath;

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
    let dirPath = path.join(full_path, classNameInSnake)

    let cubitFile = `${classNameInSnake}_cubit.dart`;
    let interfaceFile = `i${classNameInSnake}_repo.dart`;
    let repoFile = `${classNameInSnake}_repo.dart`;

    let template = generateTemplate({ className, fnName, interfaceFileName: interfaceFile });

    createDirectory(dirPath)

    createFile(path.join(dirPath, cubitFile), template.cubit);
    createFile(path.join(dirPath, interfaceFile), template.interfaceStr);
    createFile(path.join(dirPath, repoFile), template.repo);
}