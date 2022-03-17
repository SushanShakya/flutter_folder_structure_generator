import { InputBoxOptions, Uri, window } from "vscode";
import { getCleanedMain } from "../templates/code/main";
import { createFile } from "../utils/utils";

export const cleanMain = async (uri: Uri) => {
    // [full_path] is the path where we generate the folder structure into.
    let full_path: String;

    // Check for when user invokes command from Ctrl + Shift + p
    if (typeof uri == "undefined") {
        window.showErrorMessage("Please use command from explorer !")
        return
    } else {
        full_path = uri.fsPath
    }

    var appName = await promptForName()
    if ((typeof appName == "undefined") || (appName.trim() === "")) {
        window.showErrorMessage("The App name cannot be empty !");
        return;
    }

    let mainPath = `${full_path}\\main.dart`;
    let content = getCleanedMain(appName)

    createFile(mainPath, content)
}

function promptForName(): Thenable<string | undefined> {
    const cubitNamePromptOptions: InputBoxOptions = {
        prompt: "App Name",
        placeHolder: "app name in snake_case",
    };
    return window.showInputBox(cubitNamePromptOptions);
}