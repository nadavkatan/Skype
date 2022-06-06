import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    messageWrapper:{
        display: 'flex',
    },
    messageContainer:{

    },
    avatarContainer:{
        display: 'flex',
        alignItems: 'center',
        margin:'0 0.5em 0.5em 1em'
    },
    message:{
        backgroundColor: '#F1F1F3',
        borderRadius:'0 10px 10px 10px',
        padding:'0.5em'
    },
    messageTime:{
        color:'#9FA2A5',
        fontSize: '0.7em'
    }
})