import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";
const DialogComponent= (props: { wait: boolean; })=>{
    return(
        <Dialog open={props.wait}
                disableEscapeKeyDown={true}
                transitionDuration={0}
        >
            <DialogTitle>
            Please Wait
            </DialogTitle>
            <DialogContent>
                ...Contacting server...
            </DialogContent>
            <DialogContentText>
            </DialogContentText>

        </Dialog>
    )
}
export default DialogComponent;