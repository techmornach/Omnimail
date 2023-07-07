import React from "react";
import {Button, InputBase, TextField} from "@mui/material";

const MessageView = (props: any)=>{
    return(
        <div>
            {props.currentView === "message" &&
                <>
                    <InputBase defaultValue={`ID${props.messageID}`}
                               margin={"dense"} disabled={true} fullWidth={true}
                               className={"messageInfoField"}
                    />
                    <br/>
                    <InputBase defaultValue={ props.messageDate } margin="dense"
                               disabled={ true } fullWidth={ true }
                               className="messageInfoField" />
                    <br/>
                    <TextField margin={"dense"} variant={"outlined"} value={props.messageFrom} disabled={true} inputProps={{style:{color: "#000000"}}}/>


                </>

            }
            { props.currentView === "compose" && <br/>}
            <TextField margin="dense" id="messageSubject" label="Subject"
                       variant="outlined" fullWidth={ true }
                       value={ props.messageSubject }
                       disabled={ props.currentView === "message" }
                       InputProps={{ style : { color : "#000000" } }}
                       onChange={ props.fieldChangeHandler } />
            <br />
            <TextField margin="dense" id="messageBody" variant="outlined"
                       fullWidth={ true } multiline={ true } rows={ 12 }
                       value={ props.messageBody }
                       disabled={ props.currentView === "message" }
                       InputProps={{ style : { color : "#000000" } }}
                       onChange={ props.fieldChangeHandler } />

            { props.currentView === "compose" &&
                <Button variant="contained" color="primary" size="small"
                        style={{ marginTop:10 }}
                        onClick={ props.sendMessage }>
                    Send
                </Button> }
            { props.currentView === "message" &&
                <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }} onClick={ () => props.showComposeMessage("reply") }
                >
                Reply
                </Button>
            }
            { props.currentView === "message" &&
                <Button variant="contained" color="primary" size="small"
                        style={{ marginTop:10 }}
                        onClick={ props.deleteMessage }>
                    Delete
                </Button> }

        </div>
    )
}

export default MessageView