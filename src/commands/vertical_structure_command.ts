import { Uri } from "vscode";
import { generateStructure } from "../utils/utils";
import * as template from "../templates/vert_template.json"

export const vertStruct = async (uri: Uri) => {
    generateStructure(uri, template)
}