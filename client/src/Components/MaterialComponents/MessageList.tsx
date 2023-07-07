import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

const MessageList = (props:any)=>{
    return(
        <div className={"centerArea"}>
            <div className={"messageList"}>
                <Table stickyHeader padding={"none"}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: 120}}>Date</TableCell>
                            <TableCell style={{width: 300}}>From</TableCell>
                            <TableCell>Subject</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.messages.map((message:any)=>{
                                return(
                                    <TableRow key={message.id}
                                        onClick = {()=>{props.showMessage(message)}}
                                    >
                                        <TableCell>
                                            {new Date(message.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {message.from}
                                        </TableCell>
                                        <TableCell>
                                            {message.subject}
                                        </TableCell>
                                    </TableRow>
                                )

                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default MessageList