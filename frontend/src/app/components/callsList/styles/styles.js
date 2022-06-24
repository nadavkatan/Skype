import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    callListContainer:{
        overflowY:'scroll',
        marginTop:'0.5em',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        height:'74%'
    },
    smScreenCallListContainer:{
        overflowY:'scroll',
        marginTop:'0.5em',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        height:'70%'
    },
    callItemContainer:{
        display: "flex",
        justifyContent: "space-between",
        width:'90%',
        marginBottom: "1em",
    },
    callItemAvatarUsername:{
        display: "flex",
    },
    callItemUsername:{
        marginLeft: '1em!important'
    }
})