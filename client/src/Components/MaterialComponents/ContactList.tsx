import React from "react";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {Person} from "@mui/icons-material";

const ContactList = (props :any)=>{
    return(
        <div className="contactList">
            <List>
                {props.contacts.map((value :any)=>{
                return(
                    <ListItem key={value} button onClick={()=>{
                        props.showContact(
                            value._id, value.name, value.email
                        )
                    }}>
                        <ListItemAvatar>
                            <Avatar><Person/></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${value.name}`}/>
                    </ListItem>
                )
            })}
            </List>
        </div>
    )
}

export default ContactList