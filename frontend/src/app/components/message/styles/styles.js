import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    myMessage:{
        padding:'0.5em',
        textAlign:'right',
        backgroundColor: '#DBF0FF',
        borderRadius: '10px 10px 0 10px',
        fontSize: '0.8em',
    },
    myMessageContainer:{
        // backgroundColor: 'lightgray',
        display: 'flex',
        justifyContent: 'flex-end',

    },
    myMessageWrapper:{
        textAlign:'right',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'flex-end',
        margin: '1em'
    },
    myMessageTime:{
        color:'#9FA2A5',
        fontSize: '0.7em'
    }
})