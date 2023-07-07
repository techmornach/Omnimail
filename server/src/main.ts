import path from "path";
import express, {Express, NextFunction, Request, Response} from "express";
import {serverInfo} from "./ServerInfo";
import  * as IMAP from "./IMAP";
import  * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import {IContact} from "./Contacts"

const app = express();
//Handles incoming bodies containing json
app.use(express.json());
//Handle CORS
app.use((req:Request, res: Response, next:NextFunction)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
    //Why didn't I simply use the cors module😂😂
})

//Client directory
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//List Mailboxes
app.get("/mailboxes",
        async (req: Request, res:Response)=>{
            try{
                const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
                const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
                res.json(mailboxes);
            }
            catch(err){
                res.send(err);
            }
        }
    )
//List Messages
app.get("/mailboxes/:mailbox",
    async (req: Request, res: Response)=>{
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        const messages: IMAP.IMessage[] = await imapWorker.listMessages({
            mailbox: req.params.mailbox
        });
        res.json(messages);
    }catch(err){
        res.send(err)
    }
})
//Get Message
app.get("/messages/:mailbox/:id", async (req:Request, res:Response)=>{
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const messageBody: string | undefined = await imapWorker.getMessageBody({
            mailbox: req.params.mailbox,
            id: parseInt(req.params.id, 10)
        });
        res.send(messageBody)
    }catch(err){
        res.send(err)
    }
})
//Delete Message
app.delete("/messages/:mailbox/:id", async(req:Request, res:Response)=>{
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        await imapWorker.deleteMessage({
            mailbox: req.params.mailbox,
            id: parseInt(req.params.id, 10),
        });
        res.send("ok")
    }catch(err){
        res.send(err)
    }
})
//Send Message
app.post("/messages", async(req: Request, res: Response)=>{
    try{
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        await smtpWorker.sendMessage(req.body);
        res.send("ok")
    }catch(err){
        res.send(err)
    }
})
//List Contacts
app.get("/contacts", async(req:Request, res:Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contacts: IContact[] = await contactsWorker.listContacts();
        res.json(contacts);
    }catch(err){
        res.send(err);
    }
})
//Add Contacts
app.post("/contacts", async(req:Request, res:Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contact: IContact = await contactsWorker.addContact(req.body);
        res.json(contact)
    }catch(err){
        res.send(err);
    }
})
//Update Contact
app.put("/contacts/:id", async (req: Request, res: Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        await contactsWorker.updateContact(req.params.id, req.body);
        res.send("Updated")
    }catch(err){
        res.send(err);
    }
})
//Delete Contact
app.delete("/contacts/:id", async(req: Request, res:Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        await contactsWorker.deleteContact(req.params.id);
        res.send("Deleted")
    }catch (err) {
        res.send(err)
    }
})
app.listen(8080 || process.env.PORT, "localhost", ()=>{
    console.log("App Starting at 8080")
});