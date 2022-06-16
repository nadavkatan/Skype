import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    editPageWrapper:{
        height:'100vh',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
    },
    editPageContainer:{
        width:'60%',
        marginTop: '3em'
    },
    editPageFormContainer:{

    },
    editPageHeader:{

    },
    formHeader:{
        margin: '1em 0 2em 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end'
    },
    editPageAvatarContainer:{
        position: 'relative',

    },
    editIcon:{
        position: 'absolute',
        bottom:0,
        right:0
    }
})