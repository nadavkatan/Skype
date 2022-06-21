import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useStyles } from "./styles/styles";

const QuickAction = ({ quickActionImg, title, subtitle }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.actionContainer}>
      <div className={classes.actionContentContainer}>
        <img className={classes.actionImg} src={quickActionImg} alt="" />
        <Typography className={classes.actionTitle} variant="subtitle2">
          {title}
        </Typography>
        <Typography className={classes.actionSubtitle} variant="subtitle2">
          {subtitle}
        </Typography>
      </div>
    </Paper>
  );
};

export default QuickAction;
