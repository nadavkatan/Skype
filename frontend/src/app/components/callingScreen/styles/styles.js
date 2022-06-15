import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    callingScreenHeader:{
        display: 'flex',
        padding:'1em',
        boxShadow: 'inset 0px 0px 1px 0px black'
    },
    callingScreenBody:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height:'90vh',
        backgroundColor:'#EEEEEE'
    },
    callingAvatarContainer:{

    },
    connecting:{
        fontSize: '0.8em'
    },
    callingScreenEndCall:{
        marginTop:'6em'
    }
})