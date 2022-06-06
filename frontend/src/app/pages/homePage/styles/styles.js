import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    profileContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainerLink:{
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'lightgray',
        display:'flex',
        width:'70%',
        padding: '0.2em',
        marginBottom: '0.5em',
    },
    avatarContainer:{
        margin: '0.5em'
    }
})