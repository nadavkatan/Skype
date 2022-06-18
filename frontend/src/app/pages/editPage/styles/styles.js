import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    editPageWrapper:{
        height:'100%',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        // backgroundColor: '#F2F2F2',
        // backgroundImage: 'url("https://www.transparenttextures.com/patterns/diagmonds-light.png")'
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
    editPageAvatar:{
        marginBottom:'1em'
    },
    editIcon:{
        position: 'absolute',
        bottom:0,
        right:0
    },
    backBtnContainer:{
        width: '60%',
        padding: '1em 0 2em 0'
    }
})