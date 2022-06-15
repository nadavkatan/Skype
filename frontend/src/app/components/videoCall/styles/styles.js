import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    myVideoContainer:{
        position: 'absolute',
        zIndex:10,
        borderRadius:'20px',
        width:'30%',
        top:'90px',
        right:'10px'
    },
    myVideo:{
        borderRadius:'20px',
        width:'100%'
    },
    partnerVideoContainer:{
        backgroundColor: 'yellow',
        width: '100%',
        zIndex:0,
        // width: '300px'
    },
    videosContainer:{
        position:'relative',
        width:'60%'
    },
    videosPageContainer:{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
    }
})