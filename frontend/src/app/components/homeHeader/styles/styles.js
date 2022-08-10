import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    profileContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    searchContainerLink:{
        border: 'none',
        borderRadius: '10px',
        backgroundColor: '#F1F1F4',
        display:'flex',
        width:'80%',
        padding: '0.2em',
        marginBottom: '0.5em',
    },
    searchPlaceholder:{
        color:'#73777B',
        fontSize: '0.8em',
        paddingTop: '0.4em',
    },
    searchIcon:{
        padding: '0.2em 0.2em'
    },
    avatarContainer:{
        margin: '0.5em'
    },
    lgScreenUserInfo:{
        display:'flex',
        alignItems: 'center',
        width: '100%',
        padding: '1em 1em 0.3em 3.2em'
    },
    sideBarHeaderUsername:{
        fontWeight:'bold',
    }
})