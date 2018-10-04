"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const appInsightsClient_1 = require("./appInsightsClient");
const pioTerminal_1 = require("./pioTerminal");
class PlatformIO {
    constructor() {
        this._disposables = [];
        this._pioTerminal = new pioTerminal_1.PioTerminal();
        this.createStatusBarItems();
    }
    dispose() {
        this._disposables.forEach((disposable) => disposable.dispose());
    }
    build() {
        this._pioTerminal.showAndRun("platformio run");
        appInsightsClient_1.AppInsightsClient.sendEvent("build");
    }
    upload() {
        this._pioTerminal.showAndRun("platformio run --target upload");
        appInsightsClient_1.AppInsightsClient.sendEvent("upload");
    }
    openSerialMonitor() {
        let baudRate = vscode.workspace.getConfiguration("platformio").get("baudRate");
        this._pioTerminal.showAndRun(`platformio device monitor --baud ${baudRate}`);
        appInsightsClient_1.AppInsightsClient.sendEvent("openSerialMonitor", { baudRate: baudRate.toString() });
    }
    buildUploadAndOpenSerialMonitor() {
        this.build();
        this.upload();
        this.openSerialMonitor();
        appInsightsClient_1.AppInsightsClient.sendEvent("buildUploadAndOpenSerialMonitor");
    }
    searchLibrary() {
        let query = "CANCELED";
        vscode.window.showInputBox({
            prompt: "Search for PlatformIO Library",
            placeHolder: "Type query to search",
        }).then((input) => {
            if (input !== undefined) {
                query = input;
                this._pioTerminal.showAndRun(`platformio lib search ${query}`);
            }
            appInsightsClient_1.AppInsightsClient.sendEvent("searchLibrary", { query });
        });
    }
    installLibrary() {
        let library = "CANCELED";
        vscode.window.showInputBox({
            prompt: "Install PlatformIO Library",
            placeHolder: "Type library id or name to install",
        }).then((input) => {
            if (input !== undefined) {
                library = input;
                this._pioTerminal.showAndRun(`platformio lib install ${library}`);
            }
            appInsightsClient_1.AppInsightsClient.sendEvent("installLibrary", { library });
        });
    }
    openTerminal() {
        let showHelpInfo = vscode.workspace.getConfiguration("platformio").get("showHelpInfo");
        if (showHelpInfo) {
            this._pioTerminal.showAndRun("platformio --help");
        }
        else {
            this._pioTerminal.show();
        }
        appInsightsClient_1.AppInsightsClient.sendEvent("openTerminal", { showHelpInfo: showHelpInfo.toString() });
    }
    onDidCloseTerminal(closedTerminal) {
        this._pioTerminal.onDidCloseTerminal(closedTerminal);
    }
    createStatusBarItems() {
        let openSerialMonitorStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
        this._disposables.push(openSerialMonitorStatusBarItem);
        openSerialMonitorStatusBarItem.command = "platformio.openSerialMonitor";
        openSerialMonitorStatusBarItem.text = "$(plug) Serial Monitor";
        openSerialMonitorStatusBarItem.tooltip = "Open Serial Monitor";
        openSerialMonitorStatusBarItem.show();
        let searchLibraryStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 4);
        this._disposables.push(searchLibraryStatusBarItem);
        searchLibraryStatusBarItem.command = "platformio.searchLibrary";
        searchLibraryStatusBarItem.text = "$(search) Library";
        searchLibraryStatusBarItem.tooltip = "Search PlatformIO Library";
        searchLibraryStatusBarItem.show();
        let installLibraryStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);
        this._disposables.push(installLibraryStatusBarItem);
        installLibraryStatusBarItem.command = "platformio.installLibrary";
        installLibraryStatusBarItem.text = "$(cloud-download)";
        installLibraryStatusBarItem.tooltip = "Install PlatformIO Library";
        installLibraryStatusBarItem.show();
        let openTerminalStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2);
        this._disposables.push(openTerminalStatusBarItem);
        openTerminalStatusBarItem.command = "platformio.openTerminal";
        openTerminalStatusBarItem.text = "$(terminal)";
        openTerminalStatusBarItem.tooltip = "Open PlatformIO Terminal";
        openTerminalStatusBarItem.show();
        let buildUploadAndOpenSerialMonitorStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        this._disposables.push(buildUploadAndOpenSerialMonitorStatusBarItem);
        buildUploadAndOpenSerialMonitorStatusBarItem.command = "platformio.buildUploadAndOpenSerialMonitor";
        buildUploadAndOpenSerialMonitorStatusBarItem.text = " $(arrow-right) ";
        buildUploadAndOpenSerialMonitorStatusBarItem.tooltip = "Build, Upload and Open Serial Monitor";
        buildUploadAndOpenSerialMonitorStatusBarItem.show();
    }
}
exports.PlatformIO = PlatformIO;
//# sourceMappingURL=platformio.js.map