import { Uri } from "vscode";
import * as template from "../templates/horiz_template.json"
import { generateStructure } from "../utils/utils";

export const horizStruct = async (uri: Uri) => {
    generateStructure(uri, template)
}





