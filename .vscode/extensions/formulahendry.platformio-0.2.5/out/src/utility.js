"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const os = require("os");
const path = require("path");
class Utility {
    static fileExistsSync(filePath) {
        try {
            return fs.statSync(filePath).isFile();
        }
        catch (e) {
            return false;
        }
    }
    static directoryExistsSync(dirPath) {
        try {
            return fs.statSync(dirPath).isDirectory();
        }
        catch (e) {
            return false;
        }
    }
    static getCppConfigPlatform() {
        const plat = os.platform();
        if (plat === "linux") {
            return "Linux";
        }
        else if (plat === "darwin") {
            return "Mac";
        }
        else if (plat === "win32") {
            return "Win32";
        }
    }
    static normalizePaths(paths) {
        let result = [];
        paths.forEach((value) => {
            result.push(path.resolve(path.normalize(value)));
        });
        return result;
    }
}
exports.Utility = Utility;
//# sourceMappingURL=utility.js.map