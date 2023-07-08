"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const path_1 = __importDefault(require("path"));
const nedb_1 = __importDefault(require("nedb"));
class Worker {
    constructor() {
        this.db = new nedb_1.default({
            filename: path_1.default.join(__dirname, "/contacts.db"),
            autoload: true,
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
