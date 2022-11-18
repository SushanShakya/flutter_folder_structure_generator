import { Uri } from "vscode";
import * as template from "../templates/clean_architecture_template.json"
import { generateStructure } from "../utils/utils";

export const cleanArchitecture = async (uri: Uri) => {
    console.log('---- Clean Architecture')
    generateStructure(uri, template)
}





