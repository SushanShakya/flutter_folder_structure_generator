import { InputBoxOptions, Uri, window } from "vscode"
import { generateTemplate } from "../utils/utils"
import * as template from "../templates/feat_template.json"
import * as form_template from "../templates/features/form_template.json";
import * as bot_nav_template from "../templates/features/bottom_nav_template.json";
import * as onboarding_template from "../templates/features/onboarding_template.json";
import * as auth_template from "../templates/features/auth_template.json";

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
    if (featureName === "form" || featureName === "forms") {
        new_template = form_template
    } else if (featureName === "bottom_nav") {
        new_template = bot_nav_template
    } else if (featureName === "onboarding") {
        new_template = onboarding_template
    } else if (featureName === "auth") {
        new_template = auth_template
    } else {
        new_template[featureName] = template
    }
    generateTemplate(new_template, full_path)
}

function promptForName(): Thenable<string | undefined> {
    const cubitNamePromptOptions: InputBoxOptions = {
        prompt: "Feature Name",
        placeHolder: "feature",
    };
    return window.showInputBox(cubitNamePromptOptions);
}