import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    myVideoContainer:{
        position: 'absolute',
        zIndex:10,
        borderRadius:'20px',
        width:'30%',
        top:'0',
        right:'0'
    },
    smScreenMyVideoContainer:{
        position: 'absolute',
        zIndex:10,
        borderRadius:'5px',
        width:'50%',
        top:'0',
        right:'0'
    },
    myVideo:{
        borderRadius:'20px',
        width:'100%',
        boxShadow: '0 0 4px black '
    },
    smScreenMyVideo:{
        borderRadius:'5px',
        width:'100%',
        boxShadow: '0 0 4px black '
    },
    partnerVideoContainer:{
        backgroundColor: 'yellow',
        width: '100%',
        zIndex:0,
        borderRadius:'20px',
        boxShadow: '0 0 5px white '
    },
    smScreenPartnerVideoContainer:{
        backgroundColor: 'yellow',
        transform: 'translateX(-30%)',
        height:'100%',
        zIndex:0,
        // borderRadius:'20px',
        boxShadow: '0 0 5px white '
    },
    videosContainer:{
        position:'relative',
        width:'60%',

    },
    smScreenvideosContainer:{
        position:'relative',
        width:'100vw',
        height:'100vh',
        overflow:'hidden',
    },
    videosPageContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor:'#2f6d75',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/escheresque.png")'
    },
    videoCallEndCallIcon:{
        position:'absolute',
        bottom: '6%',
        left: '50%'
    },
    smScreenTimerContainer:{
        position: 'absolute',
        right: '36%',
        bottom: '100px',
        zIndex: 10
    },
    timerContainer:{
    position: 'absolute',
    bottom: '-40px',
    right: '45%'
    }
})