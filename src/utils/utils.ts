import { existsSync, writeFileSync, mkdirSync, exists, PathLike, readFileSync } from "fs";
import { Uri, window } from "vscode";
import { resolve } from "path"
import mappings from "../mappings/code_template_mapping"

function createDirectory(targetDirectory: string) {
    if (!existsSync(targetDirectory)) {
        mkdirSync(targetDirectory)
    }
}

export function createFile(targetPath: string, content: string) {
    writeFileSync(targetPath, content, {
        "flag": "w+"
    })
}

function getContent(name: keyof Object): string {
    let content: string = mappings[name]
    if (typeof content == "undefined") {
        content = ""
    }
    return content
}

export function generateTemplate(obj: Object, path: String) {
    // This definition of k is required by ts to work
    let k: keyof typeof obj
    for (k in obj) {
        if (k.match("default") === null) {
        } else {
            continue
        }
        let value = obj[k]
        let full_path = `${path}\\${k}`
        // console.log(full_path)
        // console.log(value)
        if (typeof value == "string") {
            // Fetch Code if exists
            let content = getContent(k)
            // console.log(content)
            // Generate a file
            createFile(`${full_path}.dart`, content)
            // console.log("I am a file")
        } else if (typeof value == "object") {
            // Generate a Folder
            createDirectory(full_path)
            // Recursively generate the sub-folders
            // console.log("I am a folder")
            generateTemplate(value, full_path)
        } else {
            // Format Error : Don't do anything
            // console.log("I am a nothing")
            continue
        }
    }
}

export function generateStructure(uri: Uri, template: object) {
    // [full_path] is the path where we generate the folder structure into.
    let full_path: String;

    // Check for when user invokes command from Ctrl + Shift + p
    if (typeof uri == "undefined") {
        window.showErrorMessage("Please use command from explorer !")
        return
    } else {
        full_path = uri.fsPath
    }
    generateTemplate(template, full_path)
}