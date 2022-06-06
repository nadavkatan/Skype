import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    searchResultContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        // height: '100%',
    },
    searchResult:{
        display: 'flex',
        margin:'0.6em',
        alignItems: 'center',
        width:'50%',
        justifyContent: 'space-around',
    },
    searchResultText:{
        fontSize:'1em',
        fontWeight:'bold',
    },
    sendFriendRequest:{
        margin:'0.6em'
    }
})