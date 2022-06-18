import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    searchResultContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
        // height: '100%',
    },
    searchResult:{
        display: 'flex',
        margin:'0.6em',
        alignItems: 'center',
        width:'50%',
        justifyContent: 'flex-start',
    },
    searchResultText:{
        fontSize:'1em',
        fontWeight:'bold',
        marginLeft: '1em'
    },
    sendFriendRequest:{
        margin:'0.6em'
    }
})