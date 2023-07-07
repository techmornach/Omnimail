import React from "react";
import {Button, TextField} from "@mui/material";

const ContactView = (props :any)=>{
    return(
        <form>
            <TextField margin={"dense"} id={"contactName"} label={"Name"}
                value={props.contactName} variant={"outlined"} InputProps={{style:{color: "#000000"}}}
                disabled={props.currentView === "contact"} style={{width:260}}
            />
            <br/>
            <TextField margin={"dense"} id={"contactEmail"} label={"Email"}
                       value={props.contactEmail} variant={"outlined"} InputProps={{style:{color: "#000000"}}}
            />
            {props.currentView === "contactAdd" &&
                <Button variant={"contained"} color="primary" size="small"
                        style={{ marginTop:10 }} onClick={ props.saveContact} >
                    Save
                </Button>
            }
            {props.currentView === "contact" &&
                <Button variant={"contained"} color="primary" size="small"
                        style={{ marginTop:10, marginRight:10 }} onClick={ props.deleteContact} >
                    Delete
                </Button>
            }
            {props.currentView === "contact" &&
                <Button variant={"contained"} color="primary" size="small"
                        style={{ marginTop:10 }} onClick={ props.showComposeMessage("contact")} >
                    Send Email
                </Button>
            }
        </form>
    )
}

export default ContactView