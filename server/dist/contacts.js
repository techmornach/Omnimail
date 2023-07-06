"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const path = __importStar(require("path"));
const Datastore = require("nedb");
class Worker {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    }
    listContacts() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            });
        });
    }
    addContact(contact) {
        return new Promise((resolve, reject) => {
            this.db.insert(contact, (err, newDoc) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(newDoc);
                }
            });
        });
    }
    updateContact(id, contact) {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: id }, contact, {}, (err, numberOfUpdated) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Updated");
                }
            });
        });
    }
    deleteContact(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, (err, inNumRemoved) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Deleted");
                }
            });
        });
    }
}
exports.Worker = Worker;
