import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    searchBarContainer:{
        height:'15vh',
        background:'linear-gradient(to right, #A760FF, #CA82FF)',
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-around',
        paddingLeft: '0.5em'
    },
    searchBarInput:{
        backgroundColor: 'transparent',
        width:'90%',
        border:'none',
        color:'white',
        fontSize:'2em',
        fontWeight:'bold',
        '&::placeholder':{
            color:'#BFA2DB',
            // fontSize:'2em',
            // fontWeight:'bold',
        },
        '&:focus':{
            outline:'none'
        }
    },
    searchBarArrowBack:{
        color:'white',
        cursor: 'pointer'
    }
})