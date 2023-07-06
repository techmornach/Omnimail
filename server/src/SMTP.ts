import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import {SendMailOptions, SentMessageInfo} from "nodemailer";
import {IServerInfo} from "./ServerInfo";

export class Worker{
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    public sendMessage(inOptions: SendMailOptions): Promise<string>{
        return new Promise((resolve, reject)=>{
            const transport = nodemailer.createTransport(Worker.serverInfo.smtp);
            transport.sendMail(inOptions, (err:Error| null, info:SentMessageInfo)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(info)
                }
            })

        })
    }
}