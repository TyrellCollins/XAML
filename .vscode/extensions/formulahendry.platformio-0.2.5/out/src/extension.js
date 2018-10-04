"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const includePath_1 = require("./includePath");
const platformio_1 = require("./platformio");
function activate(context) {
    let platformio = new platformio_1.PlatformIO();
    context.subscriptions.push(platformio);
    let includePath = new includePath_1.IncludePath();
    context.subscriptions.push(includePath);
    context.subscriptions.push(vscode.commands.registerCommand("platformio.build", () => {
        platformio.build();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.upload", () => {
        platformio.upload();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.openSerialMonitor", () => {
        platformio.openSerialMonitor();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.buildUploadAndOpenSerialMonitor", () => {
        platformio.buildUploadAndOpenSerialMonitor();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.searchLibrary", () => {
        platformio.searchLibrary();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.installLibrary", () => {
        includePath.isEnabled = false;
        platformio.installLibrary();
        includePath.addIncludePath(true);
        includePath.isEnabled = true;
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.openTerminal", () => {
        platformio.openTerminal();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("platformio.addIncludePath", () => {
        includePath.addIncludePath();
    }));
    context.subscriptions.push(vscode.window.onDidCloseTerminal((closedTerminal) => {
        platformio.onDidCloseTerminal(closedTerminal);
    }));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map