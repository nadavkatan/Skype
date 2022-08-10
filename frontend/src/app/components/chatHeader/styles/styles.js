import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    chatHeaderContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:'1em',
        borderBottom: '0.5px solid lightgray',
        // height:'7%'
        flex:1
    },
    lgScreenChatHeaderContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:'1em',
        borderBottom: '0.5px solid lightgray'
    },
    headerFriendName:{
        fontWeight: 'bold!important',
        marginLeft: '1.5em!important'
    },
    chatHeaderUserInfo:{
        display: 'flex',
    }
})