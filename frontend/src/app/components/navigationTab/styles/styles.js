import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    navTabContainer:{
        display: 'flex',
        justifyContent: 'space-around',
        position: 'fixed',
        bottom: 0,
        width:'100%',
        padding: '1em',
        borderTop: '0.5px solid gray'
    },
    iconContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconsText:{
        fontSize:'0.7em',
        color:'gray'
    },
    tabIcon:{
        color:'#383838'
    },
    activeTabIcon:{
        color:'purple'
    }
})