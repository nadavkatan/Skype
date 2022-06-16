import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  incomingCallModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    height: '40vh',
    width: '15vw',
    boxShadow: '0 0 20px gray'
  },
  incomingCallContainer: {
    backgroundColor: "black",
    height: "100%",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  
  },
  incomingCallBody:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '80%',
    width:'85%'
  },
  incomingCallBtnsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
  },
});
