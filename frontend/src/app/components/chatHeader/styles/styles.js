import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    chatHeaderContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:'1em',
        borderBottom: '0.5px solid lightgray'
    },
    headerFriendName:{
        fontWeight: 'bold',
    }
})