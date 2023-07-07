import {Button} from "@mui/material";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
const ToolbarComponent = (props: { showComposeMessage: (arg0: string) => void; showAddContact: any; })=>
{
    return(
        <div className={"toolbar"}>
            <Button variant={"contained"} color={"primary"} size={"small"} style={{marginRight: 10}}
                    onClick={()=>{props.showComposeMessage("new")}}
            >
                <MarkUnreadChatAltIcon style={{marginRight:10}}/>
                New Message
            </Button>
            <Button variant={"contained"} color={"primary"} size={"small"}  style={{marginRight: 10}}
                    onClick={()=>{props.showAddContact()}}
            >
                <ContactMailIcon style={{marginRight:10}}/>
                New Contact
            </Button>
        </div>
    )
}

export default ToolbarComponent