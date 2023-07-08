import React, { useState } from "react";
import  * as IMAP from "../Workers/IMAP";
import  * as SMTP from "../Workers/SMTP";
import * as Contacts from "../Workers/Contacts";
import {IMailbox, IMessage} from "../Workers/IMAP";
import {IContact} from "../Workers/Contacts";
import DialogComponent from "./MaterialComponents/Dialog";
import ToolbarComponent from "./MaterialComponents/Toolbar";
import MailboxList from "./MaterialComponents/MailboxList";
import MessageList from "./MaterialComponents/MessageList";
import ContactList from "./MaterialComponents/ContactList";
import MessageView from "./MaterialComponents/MessageView";
import ContactView from "./MaterialComponents/ContactView";
import WelcomeView from "./MaterialComponents/WelcomeView";
import {config} from "../config/config";

const BaseLayout: React.FC = () => {
    const [pleaseWait, setPleaseWait] = useState(false);
    const [mailboxes, setMailboxes] = useState<IMailbox[]>([]);
    const [contacts, setContacts] = useState<IContact[] >([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [currentView, setCurrentView] = useState("welcome")
    const [currentMailbox, setCurrentMailbox] = useState<any>(null)
    const [event, setEvent] = useState(" ");

    //Contacts
    const [contactID, setContactID] = useState<any>(null);
    const [contactName, setContactName] = useState<any>(null)
    const [contactEmail, setContactEmail] = useState<any>(null)
    //Messages
    const [messageID, setMessageID] = useState<any>(null)
    const [messageDate, setMessageDate] = useState<any>(null)
    const [messageFrom, setMessageFrom] = useState<any>(null)
    const [messageTo, setMessageTo] = useState<any>(null)
    const [messageSubject, setMessageSubject] = useState<any>(null)
    const [messageBody, setMessageBody] = useState<any>(null)

//Functions
    async function getMailBoxes() {
        const imapWorker: IMAP.Worker = new IMAP.Worker();
        const mailboxes: IMailbox[] = await imapWorker.listMailboxes();
        setMailboxes(mailboxes);
    }

  //  function  addMailbox(inMailbox: IMAP.IMailbox): void{
    //    const client: IMAP.IMailbox[] = mailboxes.slice(0);
 //       client.push(inMailbox);
 //       setMailboxes(client);
   // }

    getMailBoxes().then(()=>{
        async function getContacts(){
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
            setContacts(contacts);
        }
        getContacts().then(()=>{
            setPleaseWait(false);
        })
    })

//    function addContactToList(inContact: Contacts.IContact):void{
  //      const client = contacts.slice(0);
    //    client.push(
      //      {
        //        _id:inContact._id,
          //      name: inContact.name,
            //    email: inContact.email
       //     }
       // )
      //  setContacts(client);
//}

    function showComposeMessage(inType: string):void{
        const NewMessageBody = `${config.userEmail}
            \n\n----Original Message----
            \n\n${messageBody}
        `
        switch(inType) {
            case "new":
                setMessageTo(" ");
                setMessageSubject(" ");
                setMessageBody(" ");
                setMessageFrom(config.userEmail);
                break;
            case "reply":
                setMessageTo(messageFrom);
                setMessageSubject(messageSubject);
                setMessageBody(NewMessageBody);
                break;
            case "contact":
                setMessageTo(contactEmail);
                setMessageSubject("");
                setMessageBody(" ");
                setMessageFrom(config.userEmail)
        }
    }

    function showAddContact():void{
        setCurrentView("contactAdd");
        setContactID(null);
        setContactName("");
        setContactEmail("")
    }

    function getCurrentMailbox(inPath: string):void{
        setCurrentView(inPath);
        setCurrentMailbox(inPath)
        getMessages(inPath)
    }
    async function getMessages(inPath: string): Promise <void>{
        setPleaseWait(true);
        const imapWorker:IMAP.Worker = new IMAP.Worker();
        const messages: IMAP.IMessage[] = await imapWorker.listMessages(inPath);
        setPleaseWait(false);
        clearMessages();
        setMessages(messages);
    }

    function clearMessages():void{
        setMessages([ ])
    }

    function showContact(inID: string, inName: string, inEmail: string){
        setCurrentView("contact");
        setContactID(inID);
        setContactName(inName);
        setContactEmail(inEmail)
    }
    function fieldChangeHandler(inEvent: any):void{
        setEvent(inEvent.target.id)
        if(event === "contactName" &&
            inEvent.target.value.length>16
        )    {
            return;
        }
        setEvent(inEvent.target.value)

    }

    async function saveContact():Promise<void>{
        const client = contacts.slice(0);
        setPleaseWait(true);
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contact: Contacts.IContact = await contactsWorker.addContact({
            name: contactName,
            email: contactEmail,
        })
        setPleaseWait(false);
        client.push(contact);
        setContacts(client);
        setContactID(null);
        setContactName(" ");
        setContactEmail(" ")
    }

    async function deleteContact():Promise<void>{
        setPleaseWait(true)
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        await contactsWorker.deleteContact(contactID);
        setPleaseWait(false);
        const client = contacts.filter((inElement)=>{
            return (inElement._id !== contactID)
        })
        setContacts(client);
        setContactID(null);
        setContactName(" ");
        setContactEmail(" ")
    }

    async function showMessage(inMessage:IMAP.IMessage):Promise<void>{
        setPleaseWait(true);
        const imapWorker: IMAP.Worker = new IMAP.Worker();
        const mb: string = await imapWorker.getMessageBody(
            inMessage.id, currentMailbox
        );
        setPleaseWait(false);
        setCurrentView("message")
        setMessageID(inMessage.id);
        setMessageDate(inMessage.date);
        setMessageFrom(inMessage.from);
        setMessageTo("");
        setMessageSubject(inMessage.subject);
        setMessageBody(mb);
    }
    async function sendMessage():Promise<void>{
        setPleaseWait(true);
        const smtpWorker: SMTP.Worker = new SMTP.Worker();
        await smtpWorker.sendMessage(messageTo,
            messageFrom, messageSubject,
            messageBody
        );
        setPleaseWait(false)
        setCurrentView("welcome")
    }

    async function deleteMessage():Promise<void>{
        setPleaseWait(true);
        const imapWorker: IMAP.Worker = new IMAP.Worker();
        await imapWorker.deleteMessage(
            messageID, currentMailbox
        );
        setPleaseWait(false)
        const cl =  messages.filter((inElement)=>{
            return(inElement.id !== messageID)
        })
        setMessages(cl);
        setCurrentView("welcome")
    }
    return (
        <>
            <div className={"appContainer"}>
                <DialogComponent wait={pleaseWait} />
                <ToolbarComponent showComposeMessage={showComposeMessage} showAddContact={showAddContact}/>
                <MailboxList mailboxes={mailboxes} getCurrentMailbox={getCurrentMailbox} currentMailbox={currentMailbox}/>
                <div className={"centerView"}>
                    <MessageList messages={messages} showMessage={showMessage}/>
                    {currentView === "welcome" && <WelcomeView/>}
                    {(currentView ==="message" || currentView === "compose")&&<MessageView currentView={currentView} messageID={messageID} messageDate={messageDate} messageFrom={messageFrom} messageBody={messageBody} messageSubject={messageSubject} sendMessage={sendMessage} deleteMessage={deleteMessage} showComposeMessage={showComposeMessage}/>}
                    {(currentView === "contact" || currentView === "contactAdd") && <ContactView currentView={currentView} contactName={contactName} fieldChangeHandler={fieldChangeHandler} contactEmail={contactEmail} showComposeMessage={showComposeMessage} saveContact={saveContact} deleteContact={deleteContact}/>}
                </div>
                <ContactList contacts={contacts} showContact={showContact} />
            </div>
        </>
    );
};

export default BaseLayout;