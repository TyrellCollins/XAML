"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const appInsights = require("applicationinsights");
class AppInsightsClient {
    static sendEvent(eventName, properties) {
        if (this._enableTelemetry) {
            this._client.trackEvent(eventName, properties);
        }
    }
}
AppInsightsClient._client = appInsights.getClient("57f3261a-e6ea-4c31-a0e9-95d3d1138025");
AppInsightsClient._enableTelemetry = vscode.workspace.getConfiguration("platformio").get("enableTelemetry");
exports.AppInsightsClient = AppInsightsClient;
//# sourceMappingURL=appInsightsClient.js.map