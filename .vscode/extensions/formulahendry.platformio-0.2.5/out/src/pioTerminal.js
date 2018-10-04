"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class PioTerminal {
    constructor() {
        this._terminal = vscode.window.createTerminal("PlatformIO");
    }
    show() {
        if (this._terminal === null) {
            this._terminal = vscode.window.createTerminal("PlatformIO");
        }
        this._terminal.show();
    }
    showAndRun(text) {
        this.show();
        this._terminal.sendText(text);
    }
    onDidCloseTerminal(closedTerminal) {
        if (this._terminal === closedTerminal) {
            this._terminal = null;
        }
    }
}
exports.PioTerminal = PioTerminal;
//# sourceMappingURL=pioTerminal.js.map