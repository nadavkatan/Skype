import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    welcomeContainer:{
        height:'100vh',
        boxShadow: '0 0 15px lightgrey',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingTop: '5em'
    },
    welcomContent:{
        // display:'flex',
        // alignItems: 'flex-start',
        marginTop: '5em',
        height:'80%',
        width:'60%'
    },
    welcomeUsername:{
        fontWeight:'bold',
    },
    welcomeHeadingContainer:{
        display:'flex',
        width:'100%',
        marginBottom: '3em'
    },
    welcomeSubHeading:{
        marginBottom: '2em!important'
    },
    welcomeAvatarContainer:{
        margin: '-1em 2em 0 0'
    },
    welcomeFooter:{

    },
    welcomeFooterText:{
        textAlign:'center',
    },
    welcomeSwitchingAccouts:{
        color:'#1363DF',
        cursor: 'pointer'
    }

})