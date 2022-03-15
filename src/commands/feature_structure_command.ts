import { InputBoxOptions, Uri, window } from "vscode"
import { generateTemplate } from "../utils/utils"
import * as template from "../templates/feat_template.json"

export const featStruct = async (uri: Uri) => {
    // [full_path] is the path where we generate the folder structure into.
    let full_path: String;

    // Check for when user invokes command from Ctrl + Shift + p
    if (typeof uri == "undefined") {
        window.showErrorMessage("Please use command from explorer !")
        return
    } else {
        full_path = uri.fsPath
    }

    var featureName = await promptForName()
    if ((typeof featureName == "undefined") || (featureName.trim() === "")) {
        window.showErrorMessage("The Feature name cannot be empty !");
        return;
    }

    let new_template: any = {}
    new_template[featureName] = template
    generateTemplate(new_template, full_path)
}

function promptForName(): Thenable<string | undefined> {
    const cubitNamePromptOptions: InputBoxOptions = {
        prompt: "Feature Name",
        placeHolder: "feature",
    };
    return window.showInputBox(cubitNamePromptOptions);
}