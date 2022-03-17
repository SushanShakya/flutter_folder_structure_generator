import * as vscode from "vscode"
import { horizStruct, vertStruct, featStruct, cleanMain } from "./commands"

// Start of the Extension
// -> Called when the extension is active
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("extension.featStruct", featStruct),
		vscode.commands.registerCommand("extension.vertStruct", vertStruct),
		vscode.commands.registerCommand("extension.horizStruct", horizStruct),
		vscode.commands.registerCommand("extension.cleanMain", cleanMain),
	)
}


// Called when the extension is deactivated
export function deactivate() { }
