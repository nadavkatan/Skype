import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    chatBody:{
        padding:'0.5em',
        overflow: 'scroll',
        height:'70vh'
    },
    lgScreenChatBody:{
        padding:'0.5em',
        overflow: 'scroll',
        height:'80vh'
    },
    chatFooter:{
        width:'100%',
        display:'flex',
        justifyContent: 'center'
    },
    typeMessage:{
        border:'none',
        backgroundColor:'#F1F1F3',
        width:'90%',
        '&:focus':{
            outline:'none',
        }
    },
    typeMessageInputContainer:{
        borderRadius:'10px',
        border:'none',
        backgroundColor:'#F1F1F3',
        width:'70%',
        display:'flex',
        justifyContent: 'space-between',
        padding:'0.4em',
    },
    lgScreenTypeMessageInputContainer:{
        borderRadius:'30px',
        border:'none',
        backgroundColor:'#F1F1F3',
        width:'70%',
        display:'flex',
        justifyContent: 'space-between',
        padding:'1em',
    },
    sendIcon:{
        cursor:'pointer',
    }
})