import React, { useState } from "react";
import  * as IMAP from "../Workers/IMAP";
//import  * as SMTP from "../Workers/SMTP";
import * as Contacts from "../Workers/Contacts";
import {IMailbox} from "../Workers/IMAP";
import {IContact} from "../Workers/Contacts";
import DialogComponent from "./Dialog";
import ToolbarComponent from "./Toolbar";

const BaseLayout: React.FC = () => {
    const [pleaseWait, setPleaseWait] = useState(false);
    const [mailboxes, setMailboxes] = useState<IMailbox[]>([]);
    const [contacts, setContacts] = useState<IContact[] >([]);

    async function getMailBoxes() {
        const imapWorker: IMAP.Worker = new IMAP.Worker();
        const mailboxes: IMailbox[] = await imapWorker.listMailboxes();
        setMailboxes(mailboxes);
    }

    function  addMailbox(inMailbox: IMAP.IMailbox): void{
        const client: IMAP.IMailbox[] = mailboxes.slice(0);
        client.push(inMailbox);
        setMailboxes(client);
    }

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

    function addContactToList(inContact: Contacts.IContact):void{
        const client = contacts.slice(0);
        client.push(
            {
                _id:inContact._id,
                name: inContact.name,
                email: inContact.email
            }
        )
        setContacts(client);
    }
    return (
        <>
            <div className={"appContainer"}>
                <DialogComponent wait={pleaseWait} />
                <ToolbarComponent/>
            </div>
        </>
    );
};

export default BaseLayout;
