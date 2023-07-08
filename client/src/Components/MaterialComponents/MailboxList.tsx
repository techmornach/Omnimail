import React from "react";
import { List, Chip } from "@mui/material";

const MailboxList = (props: {
    mailboxes: { name: any; path: any }[];
    getCurrentMailbox: (arg0: any) => void;
    currentMailbox: any;
}) => {
    return (
        <div className={"mailboxList"}>
            <List>
                {props.mailboxes.map((value: { name: any; path: any }, index: number) => (
                    value.name !== "[Gmail]" && (
                        <Chip
                            key={index}
                            label={`${value.name}`}
                            onClick={() => {
                                props.getCurrentMailbox(value.path);
                            }}
                            style={{ width: 128, marginBottom: 10 }}
                            color={props.currentMailbox === value.path ? "secondary" : "primary"}
                        />
                    )
                ))}
            </List>
        </div>
    );
};

export default MailboxList;
