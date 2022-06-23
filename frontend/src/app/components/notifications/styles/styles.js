import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    notificationsContainer:{
        // margin:'1em',
        overflowY: 'scroll',
        height: '90vh'

    },
    notificationsHeading:{
        margin: '1em',
        textAlign: 'center',
    },
    connectionConfirmationContainer:{
        height:'6vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid lightgray',
        borderBottom: '1px solid lightgray',
        padding:'1em',
        boxShadow: '-4px 1px 11px 0px grey'
    },
    connectionConfirmationText:{
        color:'#06283D'
    }
})