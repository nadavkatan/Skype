import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    actionContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionContentContainer:{
        width:'90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionImg:{
        height:'auto',
        margin: '1em 0',
        width: '100%',
    },
    actionTitle:{
        fontWeight:'bold',
        marginBottom: '1em',
        textAlign: 'center',
    },
    actionSubtitle:{
        marginBottom: '1em',
        color:'#B5B8BA',
        fontWeight:500,
    }
})