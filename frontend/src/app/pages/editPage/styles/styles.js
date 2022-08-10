import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    editPageWrapper:{
        height:'100%',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        // backgroundColor: '#F2F2F2',
        // backgroundColor: '#8CC0DE',
        // backgroundImage: 'url("https://i.pinimg.com/564x/e4/e5/13/e4e51394878a07da16a7f385ac5a75c5.jpg")',
        // backgroundSize: 'contain',
        // backgroundRepeat: 'no-repeat',
        // backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
        // backgroundImage: 'url("https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg")',
        // backgroundColor: '#567499',
        // backgroundImage: 'url("https://www.transparenttextures.com/patterns/back-pattern.png")'
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
    editPageTitle:{
        fontWeight:'bold!important',
        marginBottom:'0.6em!important'
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
        marginBottom:'1em',
        borderRadius: '50%',
        width:'9.4em',
        boxShadow: '-5px 0 16px gray'
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