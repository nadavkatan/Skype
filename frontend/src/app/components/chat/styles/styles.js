import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    chatBody:{
        padding:'0.5em',
        overflow: 'scroll',
        height:'70vh'
    },
    chatFooter:{
        width:'100%',
        display:'flex',
        justifyContent: 'center'
    },
    typeMessage:{
        // borderRadius:'10px',
        border:'none',
        backgroundColor:'#F1F1F3',
        // width:'70%'
        '&:focus':{
            outline:'none',
        }
    },
    typeMessageInputContainer:{
        borderRadius:'10px',
        border:'none',
        backgroundColor:'#F1F1F3',
        width:'70%',
        display:'flex',
        justifyContent: 'space-between',
        padding:'0.4em'
    }
})