"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
const path = require("path");
const fs = require("fs");
const rawInfo = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
exports.serverInfo = JSON.parse(rawInfo);
