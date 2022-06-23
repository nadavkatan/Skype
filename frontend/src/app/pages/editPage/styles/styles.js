import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    editPageWrapper:{
        height:'100%',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        // backgroundColor: '#F2F2F2',
        // backgroundImage: 'url("https://www.transparenttextures.com/patterns/axiom-pattern.png"")'
    },
    editPageContainer:{
        width:'60%',
        marginTop: '3em'
    },
    smScreenEditPageContainer:{
        width:'80%',
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
    smScreenFormHeader:{
        margin: '1em 0 2em 0',
        display: 'flex',
        flexDirection:'column',
    },
    editPageAvatarContainer:{
        position: 'relative',

    },
    smScreenEditPageAvatarContainer:{
        position: 'relative',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center'
    },
    editPageAvatar:{
        marginBottom:'1em'
    },
    smScreenChangePictureBtn:{
        width: '100%!important',
        marginBottom: '1em'
    },
    editIcon:{
        position: 'absolute',
        bottom:0,
        right:0
    },
    backBtnContainer:{
        width: '60%',
        padding: '1em 0 2em 0'
    },
    smScreenBackBtnContainer:{
        width: '80%',
        padding: '1em 0 2em 0'
    },
    smScreenBackBtn:{
        width:'100%'
    }
})