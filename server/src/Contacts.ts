import * as path from "path"
const Datastore = require("nedb");

export interface IContact{
    _id?:number, name: string, email: string
}
export class Worker{
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename:path.join(__dirname, "/contacts.db"),
            autoload: true
        })
    }
    public listContacts():Promise<IContact[]>{
        return new Promise((resolve, reject)=>{
            this.db.find({ }, (err:Error, docs: IContact[])=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs)
                }
            })
        })
    }
    public addContact(contact: IContact):Promise<IContact>{
        return new Promise((resolve, reject)=>{
            this.db.insert(contact, (err: Error|null, newDoc:IContact)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(newDoc)
                }
            })
        })
    }
    public updateContact(id:string, contact:IContact):Promise<string>{
        return new Promise((resolve, reject)=>{
            this.db.update({_id: id}, contact,{ },(err: Error|null, numberOfUpdated: number)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve("Updated")
                }
            })
        })
    }

    public deleteContact(id: string):Promise<string>{
        return new Promise((resolve, reject)=>{
            this.db.remove({_id:id}, { }, (err: Error|null, inNumRemoved: number)=>{
                if(err){
                    reject(err);
                }else{
                    resolve("Deleted");
                }
            })
        })
    }
}