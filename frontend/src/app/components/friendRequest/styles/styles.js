import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    friendRequestFab:{
        margin:'0.3em'
    },
    friendRequestText:{
        fontWeight:'bold'
    },
    friendRequestTextContainer:{
        display: 'flex',
        alignItems: 'center'
    },
    friendRequestFabsContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%'
    },
    friendRequestContainer:{
        padding:'0 0 1em 1em',
        borderBottom: '0.5px solid lightgray',
        borderTop: '0.5px solid lightgray',
    }
})