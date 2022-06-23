import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    changePasswordContainer:{
        // marginBottom: '4em'
    },
    changePasswordHeader:{
        display: 'flex',
        justifyContent: 'space-between',
        margin:'3em 0 1em 0'
    },
    smScreenChangePasswordHeader:{
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        margin:'3em 0 2em 0'  
    },
    smScreenChangePasswordHeaderText:{
        fontSize:'1.5em',
        textAlign:'center',
        marginBottom: '1em'
    }
})