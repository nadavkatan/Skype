import React from 'react'
import Typography  from '@mui/material/Typography';
import {useStyles} from './styles/styles';

const Message = ({message}) => {

    const classes = useStyles();

  return (
    <div className={classes.myMessageWrapper}>
        <Typography className={classes.myMessageTime} variant="subtitle1">{message.time}</Typography>
        <div className={classes.myMessageContainer}>
            <Typography variant="subtitle2" className={classes.myMessage}>{message.message}</Typography>
        </div>
    </div>
  )
}

export default Message