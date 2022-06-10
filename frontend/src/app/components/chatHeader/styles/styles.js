import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    chatHeaderContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:'1em',
        borderBottom: '0.5px solid lightgray'
    },
    lgScreenChatHeaderContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:'1em',
        borderBottom: '0.5px solid lightgray'
    },
    headerFriendName:{
        fontWeight: 'bold',
        marginLeft: '1.5em'
    },
    chatHeaderUserInfo:{
        display: 'flex',
    }
})