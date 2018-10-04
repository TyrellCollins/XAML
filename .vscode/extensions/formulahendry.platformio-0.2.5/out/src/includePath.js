"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
const appInsightsClient_1 = require("./appInsightsClient");
const utility_1 = require("./utility");
class IncludePath {
    constructor() {
        this._disposables = [];
        this._autoUpdateIncludesEnabled = false;
        this._autoUpdateIncludesDisposables = [];
        vscode_1.workspace.onDidChangeConfiguration(() => this.configureAutoUpdateIncludes(true), this, this._disposables);
        this.configureAutoUpdateIncludes(true);
    }
    get isEnabled() {
        return this._autoUpdateIncludesEnabled;
    }
    set isEnabled(value) {
        this.configureAutoUpdateIncludes(value);
    }
    dispose() {
        this.disposeAutoUpdateIncludes();
        this._disposables.forEach((disposable) => disposable.dispose());
    }
    addIncludePath(silent) {
        try {
            let idedata = child_process_1.execSync("platformio run --target idedata", { encoding: "utf8", cwd: vscode_1.workspace.rootPath });
            let result = /{\s*"cxx_path".+}/.exec(idedata);
            if (result) {
                let idedataJson = JSON.parse(result[0]);
                this.addIncludePathToFile(idedataJson);
            }
            else {
                if (!silent) {
                    this.showErrorToAddIncludePath();
                }
                return;
            }
            if (!silent) {
                vscode_1.window.showInformationMessage("Add Include Path to c_cpp_properties.json successfully.");
            }
        }
        catch (ex) {
            if (!silent) {
                this.showErrorToAddIncludePath();
            }
        }
        finally {
            if (!silent) {
                appInsightsClient_1.AppInsightsClient.sendEvent("addIncludePath");
            }
        }
    }
    configureAutoUpdateIncludes(enable) {
        const cppExtension = vscode_1.extensions.getExtension("ms-vscode.cpptools");
        if (cppExtension) {
            const autoUpdateIncludes = vscode_1.workspace.getConfiguration("platformio").get("autoUpdateIncludes") && enable;
            if (autoUpdateIncludes && !this._autoUpdateIncludesEnabled) {
                this.buildFolderList();
                const configFilePath = path.join(vscode_1.workspace.rootPath, ".vscode", "c_cpp_properties.json");
                if (!utility_1.Utility.fileExistsSync(configFilePath)) {
                    this.addIncludePath(true);
                }
                // Watch .piolibdeps and lib folders
                const fileSystemWatcher = vscode_1.workspace.createFileSystemWatcher("**/{.piolibdeps,lib}/**");
                this._autoUpdateIncludesDisposables.push(fileSystemWatcher);
                fileSystemWatcher.onDidCreate((e) => this.fileSystemDidCreate(e), this, this._autoUpdateIncludesDisposables);
                // Watch platformio.ini file
                const iniFileWatcher = vscode_1.workspace.createFileSystemWatcher("**/platformio.ini");
                this._autoUpdateIncludesDisposables.push(iniFileWatcher);
                iniFileWatcher.onDidChange((e) => this.addIncludePath(true), this, this._autoUpdateIncludesDisposables);
                iniFileWatcher.onDidCreate((e) => this.addIncludePath(true), this, this._autoUpdateIncludesDisposables);
            }
            if (!autoUpdateIncludes && this._autoUpdateIncludesEnabled) {
                this._folderList = undefined;
                this.disposeAutoUpdateIncludes();
            }
            this._autoUpdateIncludesEnabled = autoUpdateIncludes;
        }
    }
    fileSystemDidCreate(e) {
        let parent = this.getParentFolder(e.path);
        if (!this._folderList.has(parent)) {
            this._folderList.add(parent);
            this.debounceChanges();
        }
    }
    getParentFolder(path) {
        let reg = path.match(/^(.+)\/([^/]+)$/);
        return reg[1];
    }
    buildFolderList() {
        vscode_1.workspace.findFiles("**").then((value) => {
            this._folderList = new Set();
            value.forEach((element) => this._folderList.add(this.getParentFolder(element.path)));
        });
    }
    debounceChanges() {
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => this.foldersDidChange(), 5000);
    }
    foldersDidChange() {
        this.buildFolderList();
        this.addIncludePath(true);
    }
    disposeAutoUpdateIncludes() {
        this._autoUpdateIncludesDisposables.forEach((disposable) => disposable.dispose());
        this._autoUpdateIncludesDisposables = [];
        clearTimeout(this._debounceTimer);
    }
    addIncludePathToFile(ideData) {
        const configFilePath = path.join(vscode_1.workspace.rootPath, ".vscode", "c_cpp_properties.json");
        const configFileDir = path.dirname(configFilePath);
        if (!utility_1.Utility.directoryExistsSync(configFileDir)) {
            fs.mkdirSync(configFileDir);
        }
        let configFileContent = {
            WARNING: "This file was generated by the PlatformIO extension. Changes to this file will be lost when it is regenerated.",
            configurations: [
                {
                    name: utility_1.Utility.getCppConfigPlatform(),
                    includePath: utility_1.Utility.normalizePaths(ideData.includes),
                    defines: ideData.defines,
                    browse: {
                        path: utility_1.Utility.normalizePaths(ideData.includes),
                        limitSymbolsToIncludedHeaders: false,
                        databaseFilename: "${workspaceRoot}/.vscode/browse.vc.db",
                    },
                },
            ],
        };
        fs.writeFileSync(configFilePath, JSON.stringify(configFileContent, null, 4));
    }
    showErrorToAddIncludePath() {
        vscode_1.window.showWarningMessage("Failed to add Include Path to c_cpp_properties.json.");
    }
}
exports.IncludePath = IncludePath;
//# sourceMappingURL=includePath.js.map