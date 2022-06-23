import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    searchResultContainer:{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        // height: '100%',
    },
    searchResult:{
        display: 'flex',
        margin:'1em',
        alignItems: 'center',
        width:'50%',
        justifyContent: 'flex-start',
    },
    searchResultText:{
        fontSize:'1em!important',
        fontWeight:'bold!important',
        marginLeft: '1em!important'
    },
    sendFriendRequest:{
        margin:'0.6em'
    },
})