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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const ServerInfo_1 = require("./ServerInfo");
const IMAP = __importStar(require("./IMAP"));
const SMTP = __importStar(require("./SMTP"));
const Contacts = __importStar(require("./Contacts"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//Handle CORS
app.use((0, cors_1.default)());
//Handles incoming bodies containing json
app.use(express_1.default.json());
//app.use((req:Request, res: Response, next:NextFunction)=>{
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next();
//Why didn't I simply use the cors module😂😂
//})
//Client directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
//List Mailboxes
app.get("/mailboxes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
        const mailboxes = yield imapWorker.listMailboxes();
        res.json(mailboxes);
    }
    catch (err) {
        res.send(err);
    }
}));
//List Messages
app.get("/mailboxes/:mailbox", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailbox = decodeURIComponent(req.params.mailbox);
        const imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
        const messages = yield imapWorker.listMessages({
            mailbox: mailbox
        });
        res.json(messages);
    }
    catch (err) {
        res.send(err);
    }
}));
//Get Message
app.get("/messages/:mailbox/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailbox = decodeURIComponent(req.params.mailbox);
        const imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
        const messageBody = yield imapWorker.getMessageBody({
            mailbox: mailbox,
            id: parseInt(req.params.id, 10)
        });
        res.send(messageBody);
    }
    catch (err) {
        res.send(err);
    }
}));
//Delete Message
app.delete("/messages/:mailbox/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailbox = decodeURIComponent(req.params.mailbox);
        const imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
        yield imapWorker.deleteMessage({
            mailbox: mailbox,
            id: parseInt(req.params.id, 10),
        });
        res.send("ok");
    }
    catch (err) {
        res.send(err);
    }
}));
//Send Message
app.post("/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const smtpWorker = new SMTP.Worker(ServerInfo_1.serverInfo);
        yield smtpWorker.sendMessage(req.body);
        res.send("ok");
    }
    catch (err) {
        res.send(err);
    }
}));
//List Contacts
app.get("/contacts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        const contacts = yield contactsWorker.listContacts();
        res.json(contacts);
    }
    catch (err) {
        res.send(err);
    }
}));
//Add Contacts
app.post("/contacts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        const contact = yield contactsWorker.addContact(req.body);
        res.json(contact);
    }
    catch (err) {
        res.send(err);
    }
}));
//Update Contact
app.put("/contacts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        yield contactsWorker.updateContact(req.params.id, req.body);
        res.send("Updated");
    }
    catch (err) {
        res.send(err);
    }
}));
//Delete Contact
app.delete("/contacts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        yield contactsWorker.deleteContact(req.params.id);
        res.send("Deleted");
    }
    catch (err) {
        res.send(err);
    }
}));
app.listen(process.env.PORT || 8080, () => {
    console.log("App Starting at 8080");
});
